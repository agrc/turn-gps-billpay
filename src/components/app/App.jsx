import Routing from '../routing/Routing';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {initializeFirestore, connectFirestoreEmulator} from 'firebase/firestore';
import {getFunctions, connectFunctionsEmulator} from 'firebase/functions';
import {AuthProvider, FirestoreProvider, FunctionsProvider, useFirebaseApp, useInitFirestore} from 'reactfire';
import AppContextProvider from '../../contexts/AppContext/AppContextProvider';

export default function App() {

  // const [state, dispatch] = useImmerReducer(reduce, defaults);
  // const { setSettings: setUtahHeaderSettings } = useUtahHeaderContext();

  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  const functions = getFunctions(firebaseApp);
  // const firestoreInstance = getFirestore(firebaseApp);
  const { status, data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    return initializeFirestore(firebaseApp, {});
  });

  if (import.meta.env.DEV) {
    if (typeof window === 'undefined' || !window['_firebase_auth_emulator']) {
      try {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: true,
        });
      } catch {
        console.log('auth emulator already connected');
      }
      if (typeof window !== 'undefined') {
        window['_firebase_auth_emulator'] = true;
      }
    }
    if (typeof window === 'undefined' || !window['_firebase_functions_emulator']) {
      try {
        connectFunctionsEmulator(functions, 'localhost', 5001);
      } catch {
        console.log('functions emulator already connected');
      }
      if (typeof window !== 'undefined') {
        window['_firebase_function_emulator'] = true;
      }
    }

    if (typeof window === 'undefined' || !window['_firebase_firestore_emulator']) {
      try {
        connectFirestoreEmulator(firestoreInstance, 'localhost', 8080);
      } catch {
        console.log('firestore emulator already connected');
      }
      if (typeof window !== 'undefined') {
        window['_firebase_firestore_emulator'] = true;
      }
    }
  }
  
  return (
    firestoreInstance
      ? (
        <AuthProvider sdk={auth}>
          <FunctionsProvider sdk={functions}>
            <FirestoreProvider sdk={firestoreInstance}>
              <AppContextProvider>
                <div className='utah-design-system'>
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
