import { error, info } from 'firebase-functions/logger';
import { checkOrderExists, updateOrder, updateSubscription } from '../db/service/databaseService.js';

const parseMessage = (request) => {
  let body = {};
  switch (request.get('content-type')) {
    case 'application/json':
    case 'application/x-www-form-urlencoded':
      return request.body;
    case 'text/plain':
      body = request.body;
      return JSON.parse(`{"TOKEN": "${body}"}`);
    default:
      info('Unknown type', request.get('content-type'));
  }

  return body;
};

export const paymentCallBack = async (request, response) => {
  const CAPTURE = 'CAPTURE';
  const REVERSE = 'REVERSE';

  if (request.method !== 'POST') {
    error('HTTP Method Not Allowed');
    response.send(405, `HTTP Method ${request.method} not allowed`);
    return null;
  }
  const message = parseMessage(request);
  info('GovPay POST Payload', message);
  if (message?.TOKEN) {
    try {
      const orderExistsArray = await checkOrderExists(message.TOKEN);
      if (orderExistsArray?.length) {
        const [order] = orderExistsArray;
        // update payment
        await updateOrder(message.TOKEN, message.PAYMENT_METHOD);
        // update subscriptions
        await updateSubscription(order.orderId);

        // need to send capture or reverse
        response.status(200).send(CAPTURE);
        return CAPTURE;
      }
    } catch (err) {
      error('database error', err);
    }
  }
  response.status(200).send(REVERSE);
  return REVERSE;
};
