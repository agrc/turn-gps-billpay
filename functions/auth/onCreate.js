import { error, info } from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import { getTrimbleProfileByEmail } from '../db/service/databaseService.js';

const db = getFirestore();
export const onCreate = async (user) => {
  info('[auth::user::onCreate] adding user');
  const utahIdInfo = user.providerData.length ? user.providerData[0] : {};
  info('[auth::user::onCreate] providerData', utahIdInfo, {
    structuredData: true,
  });

  let existingUser = {};
  try {
    const trimbleUserArray = await getTrimbleProfileByEmail(user.email);
    if (trimbleUserArray?.length) {
      [existingUser] = trimbleUserArray;
    }
    info('[auth::user::onCreate] trimbleUser', existingUser);
  } catch (err) {
    error('database error', err);
  }

  const data = {
    uid: utahIdInfo?.federatedId || utahIdInfo?.uid,
    email: user.email,
    displayName: user.displayName,
    trimbleUser: existingUser,
    created_at: new Date(),
  };

  try {
    await db.collection('authenticated_users').doc(user.uid).set(data);
  } catch (errorMessage) {
    error('[auth::user::onCreate] error creating user', errorMessage, user, {
      structuredData: true,
    });
    return false;
  }

  info('[auth::user::onCreate] created user', { structuredData: true });

  return true;
};
