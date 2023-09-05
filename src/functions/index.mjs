import { initializeApp } from 'firebase-admin/app';
import { debug } from 'firebase-functions/logger';
import {auth, runWith} from 'firebase-functions/v1'; // v2 does not support this yet
import { https, setGlobalOptions  } from 'firebase-functions/v2';
import { expressServer } from './https/graphql/server.mjs';

initializeApp();
const vpc = process.env.vpc ? JSON.parse(process.env.vpc): {};
setGlobalOptions({ serviceAccount: vpc.serviceAccount, vpcConnector: vpc.vpc });

// auth
export const onCreateUser = runWith({serviceAccount: process.env.FUNCTION_SA})
  .auth.user().onCreate(async (user) => {
    debug('[auth::user::onCreate] importing createUser');
    const createUser = (await import('./auth/onCreate.mjs')).createUser;
  
    const result = await createUser(user);
  
    debug('[auth::user::onCreate]', result);
  
    return result;
});

// functions
export const getProfile = https.onCall(
  { cors: [/ut-dts-agrc-turn-gps-dev\.web\.app$/] },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getProfile] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated'
      );
    }

    debug('[https::getProfile] importing createKey');
    const getProfile = (await import('./https/getProfile.mjs')).getProfile;

    const result = await getProfile(request.auth);

    debug('[https::getProfile]', result);

    return result;
  }
);

export const graphQl = https.onRequest({ secrets: ["database", "vpc"] },expressServer);

if (process.env.LOCAL) {
  const port = process.env.PORT || process.env.GRAPHQL_PORT;
  expressServer.listen(port);
  console.log('🚀🙂😀😃 Server is running on:' + ' ' + `http://localhost:${process.env.GRAPHQL_PORT}`);
}