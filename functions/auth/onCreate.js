import { error, info } from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();
export const onCreate = async (user) => {
  info('[auth::user::onCreate] adding user', user, { structuredData: true });

  const data = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
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