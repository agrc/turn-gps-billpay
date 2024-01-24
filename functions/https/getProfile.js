import { auth, https, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import setupFirebase from '../firebase.js';
import { getTrimbleProfileByEmail } from '../db/service/databaseService.js';

setupFirebase();
const db = getFirestore();

export const getProfile = async (authData) => {
  if (!authData) {
    info('unauthenticated request', { structuredData: true });

    throw new auth.HttpsError('unauthenticated', 'You must log in');
  }
  logger.info('authData', authData);

  let profile = {
    displayName: authData.token.displayName,
    email: authData.token.email,
  };

  try {
    const userRef = db
      .collection('authenticated_users')
      .doc(authData.uid);
    const doc = await userRef.get();

    profile = doc.data();
    if (profile?.trimbleUser && Object.keys(profile.trimbleUser).length) {
      info('[https::getProfile] trimbleUserExists', profile.trimbleUser);
      return profile.trimbleUser;
    }
    const trimbleUserArray = await getTrimbleProfileByEmail(authData.token.email);
    if (trimbleUserArray?.length) {
      const [trimbleUser] = trimbleUserArray;
      await userRef.update({ trimbleUser });
      return trimbleUser;
    }
  } catch (errorMessage) {
    error('error querying profile', errorMessage, authData, {
      structuredData: true,
    });
  }

  if (!profile) {
    logger.warn('profile is empty', profile, {
      structuredData: true,
    });

    throw new https.HttpsError(
      'failed-precondition',
      'profile has not been written yet'
    );
  }

  return profile;
};
