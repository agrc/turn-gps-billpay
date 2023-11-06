import { OAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useCallback, useMemo } from 'react';
import { useFirebaseApp } from 'reactfire';

/** @typedef {import ('firebase/auth').UserCredential} UserCredential */

/** @returns {() => Promise<UserCredential>} */
export default function useSignInFunc() {
  const oAuthProvider = useMemo(
    () => {
      const utahIdProvider = new OAuthProvider('oidc.utahid');
      utahIdProvider.addScope('profile');
      utahIdProvider.addScope('email');
      return utahIdProvider;
    },
    []
  );
  const app = useFirebaseApp();
  const auth = getAuth(app);

  return useCallback(
    () => signInWithPopup(auth, oAuthProvider),
    [auth, oAuthProvider]
  );
}
