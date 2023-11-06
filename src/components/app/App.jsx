import {
  AuthProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp, useInitFirestore
} from 'reactfire';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { initializeFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { useImmer } from 'use-immer';
import Routing from '../routing/Routing';
import AppContextProvider from '../../contexts/AppContext/AppContextProvider';

export default function App() {
  // const [state, dispatch] = useImmerReducer(reduce, defaults);
  // const { setSettings: setUtahHeaderSettings } = useUtahHeaderContext();

  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const functions = getFunctions(firebaseApp);
  const { status, data: firestoreInstance } = useInitFirestore(async (firebaseAppSetup) => initializeFirestore(firebaseAppSetup, { }));
  const [state, setState] = /** @type {typeof useImmer<FormContextState>} */ (useImmer)({});

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-underscore-dangle
    if (typeof window === 'undefined' || !window._firebase_auth_emulator) {
      try {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      } catch {
        // eslint-disable-next-line no-console
        console.log('auth emulator already connected');
      }
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-underscore-dangle
        window._firebase_auth_emulator = true;
      }
    }
    // eslint-disable-next-line no-underscore-dangle
    if (typeof window === 'undefined' || !window._firebase_functions_emulator) {
      try {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      } catch {
        // eslint-disable-next-line no-console
        console.log('functions emulator already connected');
      }
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-underscore-dangle
        window._firebase_function_emulator = true;
      }
    }

    // eslint-disable-next-line no-underscore-dangle
    if (typeof window === 'undefined' || !window._firebase_firestore_emulator) {
      try {
        connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
      } catch {
        // eslint-disable-next-line no-console
        console.log('firestore emulator already connected');
      }
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-underscore-dangle
        window._firebase_firestore_emulator = true;
      }
    }
  }

  return (
    firestoreInstance
      ? (
        <AuthProvider sdk={auth}>
          <FunctionsProvider sdk={functions}>
            <FirestoreProvider sdk={firestoreInstance}>
              <AppContextProvider setState={setState} state={state}>
                <div className="utah-design-system">
                  {
                    status === 'loading'
                      ? <p>Loading...</p>
                      : <Routing />
                  }
                </div>
              </AppContextProvider>
            </FirestoreProvider>
          </FunctionsProvider>
        </AuthProvider>
      )
      : <p>Loading</p>
  );
}
