import { auth, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import { getSubscriptionsByEmail } from '../db/service/databaseService.js';

export const getSubscriptions = async (request) => {
  if (!request.auth) {
    info('unauthenticated request', { structuredData: true });
    throw new auth.HttpsError('unauthenticated', 'You must log in');
  }
  logger.info('authData email', request.auth.token.email);

  try {
    const subscriptions = await getSubscriptionsByEmail(
      request.auth.token.email,
    );
    info('[getSubscriptions :: getSubscriptionsByEmail]', subscriptions);
    return subscriptions;
  } catch (err) {
    error('[getSubscriptions :: getSubscriptionsByEmail] database error', err);
  }

  throw new auth.HttpsError('internal', 'database error');
};
