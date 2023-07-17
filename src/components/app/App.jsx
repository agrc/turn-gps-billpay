// import { useImmerReducer } from 'use-immer';

// import {
//   useFirebaseApp,
// } from 'reactfire';

// import { getAuth } from 'firebase/auth';
// import { getFunctions } from 'firebase/functions';
// import { getStorage } from 'firebase/storage';
// import { getFirestore } from 'firebase/firestore';

import Routing from '../routing/Routing';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { AuthProvider, FirestoreProvider, useFirebaseApp, useInitFirestore } from 'reactfire';
import AppContextProvider from '../../contexts/AppContext/AppContextProvider';

export default function App() {

  // const [state, dispatch] = useImmerReducer(reduce, defaults);
  // const app = useFirebaseApp();
  // const functions = getFunctions(app);
  // const storage = getStorage(app);
  // const auth = getAuth(app);
  // const firestore = getFirestore(app);
  // const { setSettings: setUtahHeaderSettings } = useUtahHeaderContext();

  const firebaseApp = useFirebaseApp();
  const { status, data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    // await enableIndexedDbPersistence(db); <-- TODO: deprecated, click on it to go to the deprecation that gives information about what should replace this
    return db;
  });
  const auth = getAuth(firebaseApp);


  return (
    firestoreInstance
      ? (
        <AuthProvider sdk={auth}>
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
        </AuthProvider>
      )
      : <p>Loading</p>
  );
}
