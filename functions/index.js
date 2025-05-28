import { initializeApp } from 'firebase-admin/app';
import { debug } from 'firebase-functions/logger';
import { https, setGlobalOptions } from 'firebase-functions/v2';
import { params } from 'firebase-functions';
import { expressServer } from './https/graphql/server.js';
import { beforeUserCreated } from 'firebase-functions/v2/identity';

initializeApp();

const vpc = params.defineString('VPC');
const vpcEgress = 'ALL_TRAFFIC';
const projectId = params.defineString('PROJECT_ID');
const serviceAccount = `firebase-function-v2-sa@${projectId.value()}.iam.gserviceaccount.com`;
const secrets = ['secrets'];
const corsOptions = [
  /ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/,
  /ut-dts-agrc-turn-gps-prod\.firebaseapp\.com$/,
  /utah\.gov/,
];

setGlobalOptions({
  serviceAccount,
  vpcConnector: vpc,
  vpcConnectorEgressSettings: vpcEgress,
  secrets,
});

// auth
export const onBeforeUserCreated = beforeUserCreated(
  {
    vpcConnector: vpc,
    vpcConnectorEgressSettings: vpcEgress,
    serviceAccount,
    secrets,
  },
  async (event) => {
    debug('[auth::user::beforeUserCreated] importing onBeforeUserCreated');
    const { onCreate: handle } = await import('./auth/onCreate.js');

    const result = await handle(event.data);

    debug('[auth::user::beforeUserCreated]', result);

    return result;
  },
);

// functions
export const getProfile = https.onCall(
  { cors: corsOptions },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getProfile] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated',
      );
    }

    const { getProfile: handle } = await import('./https/getProfile.js');

    return handle(request.auth);
  },
);

export const createTrimbleUser = https.onCall(
  { cors: corsOptions },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::createTrimbleUser] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated',
      );
    }

    const { createTrimbleUser: handle } = await import(
      './https/createTrimbleUser.js'
    );

    const result = await handle(request);

    debug('[https::createTrimbleUser]', result);

    return result;
  },
);

export const getSubscriptions = https.onCall(
  { cors: corsOptions },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::getSubscriptions] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated',
      );
    }

    const { getSubscriptions: handle } = await import(
      './https/getSubscriptions.js'
    );

    const result = await handle(request);

    debug('[https::getSubscriptions]', result);

    return result;
  },
);

export const createPayment = https.onCall(
  { cors: corsOptions },
  async (request) => {
    if (request.auth === undefined) {
      debug('[https::createPayment] no auth context');

      throw new https.HttpsError(
        https.FunctionsErrorCode.UNAUTHENTICATED,
        'unauthenticated',
      );
    }

    const { createPayment: handle } = await import('./https/createPayment.js');

    const result = await handle(request);

    debug('[https::createPayment]', result);

    return result;
  },
);

export const paymentCallBack = https.onRequest(async (request, response) => {
  const { paymentCallBack } = await import('./https/paymentCallBack.js');

  const result = await paymentCallBack(request, response);

  debug('[https::paymentCallBack : result]', result);

  return result;
});

export const syncTrimbleUsers = https.onRequest(
  {
    invoker: 'private',
  },
  async (request, response) => {
    const { syncTrimbleUsers: handle } = await import(
      './https/syncTrimbleUsers.js'
    );

    const result = await handle(request, response);

    debug('[https::syncTrimbleUsers : result]', result.length);

    response.status(200).send({ inserted: result.length });
  },
);

export const graphQl = https.onRequest(expressServer);

// if (process.env.LOCAL) {
//   const port = process.env.GRAPHQL_PORT || process.env.PORT;
//   expressServer.listen(port);
//   debug(`🚀🙂😀😃 Server is running locally on: http://localhost:${port}`);
// }
