/* eslint-disable no-return-assign */
import { getAuth, signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { useFirebaseApp } from 'reactfire';

/** @typedef {import ('firebase/auth').UserCredential} UserCredential */

/** @returns {() => Promise<UserCredential>} */
export default function useSignOutFunc() {
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return useCallback(
    () =>
      // signOut only signs out of firebase, but not UtahId, so sign out of both firebase AND utahId
      signOut(auth).then(
        () =>
          (window.location = `https://id.utah.gov/logout?goto=${window.location}`),
      ),
    [auth],
  );
}
