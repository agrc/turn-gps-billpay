import { error, info } from 'firebase-functions/logger';
import { checkOrderExists, updateOrder } from '../db/service/databaseService.js';

const parseMessage = (request) => {
  let body = '';
  switch (request.get('content-type')) {
    // '{"token":"token_xxx"}'
    case 'application/json':
      ({ body } = request.body);
      break;

    // 'token_xxx', stored in a Buffer
    case 'application/octet-stream':
      body = request.body.toString(); // Convert buffer to a string
      break;

    // 'token_xxx'
    case 'text/plain':
      body = request.body;
      break;

    // 'token=token_xxx' in the body
    case 'application/x-www-form-urlencoded':
      ({ body } = request.body);
      break;
    default:
      info('Unknown type', request.get('content-type'));
  }

  // Create response
  const response = `{"value": "${body}"}`;

  // Parse the response as JSON then return
  return JSON.parse(response);
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

  try {
    const orderExists = await checkOrderExists(message);
    if (orderExists[0].orderExists === 1) {
      // update payment
      await updateOrder(message); // amount paid? status =1, isCompleted = 1

      // need to send capture or reverse
      response.status(200).send(CAPTURE);
      return null;
    }
  } catch (err) {
    error('database error', err);
  }

  response.status(200).send(REVERSE);
  return null;
};
