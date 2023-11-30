import { error, info } from 'firebase-functions/logger';
import { checkOrderExists, updateOrder } from '../db/service/databaseService.js';

const parseMessage = (request) => {
  let body = {};
  switch (request.get('content-type')) {
    case 'application/json':
    case 'application/x-www-form-urlencoded':
      return request.body;
    case 'text/plain':
      body = request.body;
      const response = `{"token": "${body}"}`;
      return JSON.parse(response);
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
  info('message', message);

  if (message?.token) {
    console.log('token', message.token);
    try {
      const orderExists = await checkOrderExists(message.token);
      if (orderExists[0].orderExists === 1) {
        // update payment
        await updateOrder(message.token); // amount paid? status =1, isCompleted = 1

        // need to send capture or reverse
        response.status(200).send(CAPTURE);
        return null;
      }
    } catch (err) {
      error('database error', err);
    }
  }
  response.status(200).send(REVERSE);
  return null;
};
