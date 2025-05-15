import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  FirebaseAppProvider,
  FirestoreProvider,
  FirebaseAuthProvider,
  FirebaseFunctionsProvider,
} from '@ugrc/utah-design-system';
import { OAuthProvider } from 'firebase/auth';
import App from './components/app/App.jsx';

import './css/index.scss';

const utahIdProvider = new OAuthProvider('oidc.utahid');
utahIdProvider.addScope('profile');
utahIdProvider.addScope('email');

createRoot(document.getElementById('root')).render(
  <QueryClientProvider
    contextSharing
    client={
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
    }
  >
    <StrictMode>
      <FirebaseAppProvider
        config={{
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APPID,
        }}
      >
        <FirebaseAuthProvider provider={utahIdProvider}>
          <FirebaseFunctionsProvider>
            <FirestoreProvider>
              <BrowserRouter>
                <App />
                <ReactQueryDevtools />
              </BrowserRouter>
            </FirestoreProvider>
          </FirebaseFunctionsProvider>
        </FirebaseAuthProvider>
      </FirebaseAppProvider>
    </StrictMode>
  </QueryClientProvider>,
);
