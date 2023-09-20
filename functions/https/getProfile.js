import { auth, https, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import setupFirebase from '../firebase.js';

setupFirebase();
const db = getFirestore();

export const getProfile = async (authData) => {
  if (!authData) {
    info('unauthenticated request', { structuredData: true });

    throw new auth.HttpsError('unauthenticated', 'You must log in');
  }

  let profile = {
    displayName: authData.token.displayName,
    email: authData.token.email,
    license: '',
    seal: '',
  };

  try {
    const snapshot = await db
      .collection('authenticated_users')
      .doc(authData.uid)
      .get();

    profile = snapshot.data();
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
