import { initializeApp } from 'firebase-admin/app';
import { debug } from 'firebase-functions/logger';
import * as v1 from 'firebase-functions';
import { https, setGlobalOptions } from 'firebase-functions/v2';
import { params } from 'firebase-functions';
import { expressServer } from './https/graphql/server.js';

initializeApp();

const vpc = params.defineString('VPC');
const vpcEgress = 'ALL_TRAFFIC';
const serviceAccount = 'firebase-function-v2-sa@ut-dts-agrc-turn-gps-dev.iam.gserviceaccount.com';
setGlobalOptions({ serviceAccount, vpcConnector: vpc, vpcConnectorEgressSettings: vpcEgress });

// auth
export const onCreateUser = v1
  .runWith({
    vpcConnector: vpc,
    vpcConnectorEgressSettings: vpcEgress,
    serviceAccount,
  })
  .auth.user().onCreate(async (user) => {
    debug('[auth::user::onCreate] importing createUser');
    const { onCreate } = await import('./auth/onCreate.js');

    const result = await onCreate(user);

    debug('[auth::user::onCreate]', result);

    return result;
  });

// functions
export const getProfile = https.onCall(
  { cors: [/ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/, '/utah.gov'] },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getProfile] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated'
      );
    }

    /* eslint-disable no-shadow */
    const { getProfile } = await import('./https/getProfile.js');

    return getProfile(request.auth);
  }
);

export const createTrimbleUser = https.onCall(
  { cors: [/ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/, /utah\.gov/] },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::createTrimbleUser] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated'
      );
    }

   /* eslint-disable no-shadow */
    const { createTrimbleUser } = await import('./https/createTrimbleUser.js');

    const result = await createTrimbleUser(request);

    debug('[https::createTrimbleUser]', result);

    return result;
  }
);

export const getSubscriptions = https.onCall(
  { cors: [/ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/, /utah\.gov/] },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getSubscriptions] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated'
      );
    }

    /* eslint-disable no-shadow */
    const { getSubscriptions } = await import('./https/getSubscriptions.js');

    const result = await getSubscriptions(request);

    debug('[https::getSubscriptions]', result);

    return result;
  }
);

export const createPayment = https.onCall(
  { cors: [/ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/, /utah\.gov/] },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getSubscriptions] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated'
      );
    }

    /* eslint-disable no-shadow */
    const { createPayment } = await import('./https/createPayment.js');

    const result = await createPayment(request);

    debug('[https::createPayment]', result);

    return result;
  }
);

export const paymentCallBack = https.onRequest(
  { secrets: ['database'] },
  async (request, response) => {
    const { paymentCallBack } = await import('./https/paymentCallBack.js');

    const result = await paymentCallBack(request, response);

    debug('[https::paymentCallBack]', result);

    return result;
  }
);

export const graphQl = https.onRequest({ secrets: ['database'] }, expressServer);

if (process.env.LOCAL) {
  const port = process.env.PORT || process.env.GRAPHQL_PORT;
  expressServer.listen(port);
  /* eslint-disable no-console */
  console.log('🚀🙂😀😃 Server is running on: '`http://localhost:${process.env.GRAPHQL_PORT}`);
}
