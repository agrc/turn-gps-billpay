import { auth, https, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import axios from 'axios';
import {
  getNextOrderNumber,
  insertOrder,
  insertOrderItem,
} from '../db/service/databaseService.js';

function convertJsonToFormData(dataObj) {
  const formData = new FormData();
  Object.entries(dataObj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

function buildOrder(data, orderNumber, govPayToken) {
  const totalPrice = data.reduce(
    (accumulator, currentValue) => accumulator + currentValue.contractPrice,
    0,
  );
  return {
    orderNumber,
    orgId: data[0].organizationId,
    userId: data[0].userId, // maybe use the auth users userid
    totalPrice,
    govPayToken,
  };
}

async function insertOrderItemsAsync(data, orderId) {
  const results = [];
  for (const item of data) {
    item.orderId = orderId;
    results.push(insertOrderItem(item));
  }
  await Promise.all(results);
}

export const createPayment = async (request) => {
  if (!request.auth) {
    info('unauthenticated request', { structuredData: true });
    throw new auth.HttpsError('unauthenticated', 'You must log in');
  }
  if (!request.data?.length) {
    info('no data in request', { structuredData: true });
    throw new auth.HttpsError('failed-precondition', 'You must post data');
  }
  logger.info('authData email', request.auth.token.email);
  const { data } = request;

  const nextOrderResult = await getNextOrderNumber();
  const { orderNumber } = nextOrderResult[0];
  const SECRETS = process.env.secrets
    ? JSON.parse(process.env.secrets)
    : { govpay: {} };
  const { apiKey } = SECRETS.govpay;
  const url = `${SECRETS.govpay.url}createOrder.html`;

  const govPayResult = await govPayPostCall(
    apiKey,
    url,
    request.data,
    orderNumber,
  );
  if (govPayResult?.status === 200) {
    const orderToken = govPayResult?.data;

    // insert order
    const orderResult = await insertOrder(
      buildOrder(data, orderNumber, orderToken),
    );

    // insert order items
    const orderId = orderResult[0].id;
    await insertOrderItemsAsync(data, orderId);

    return `${SECRETS.govpay.url}order.html?TOKEN=${orderToken}`;
  }
  error('[createPayment :: govPayPostCall]', govPayResult);
  throw new https.HttpsError(
    'internal',
    `${govPayResult.status} : ${govPayResult.statusText}`,
  );
};

async function govPayPostCall(apiKey, url, requestData, orderNumber) {
  const orderObj = {
    API_KEY: apiKey,
    ORDER_NUMBER: orderNumber,
  };

  const jsonOrderObj = requestData.reduce(
    (accumulator, currentValue, index) => {
      const count = index + 1;
      accumulator[`ITEM_${count}`] = `${currentValue.loginName} login renewal`;
      accumulator[`ITEM_DESC_${count}`] =
        `Trimble ${currentValue.contractName} renewal for ${currentValue.organizationName}/${currentValue.loginName}`;
      accumulator[`ITEM_AMT_${count}`] = currentValue.contractPrice;
      accumulator[`ITEM_QTY_${count}`] = 1;
      return accumulator;
    },
    {},
  );

  const newObj = { ...jsonOrderObj, ...orderObj };
  const formData = convertJsonToFormData(newObj);

  return axios.post(url, formData);
}
