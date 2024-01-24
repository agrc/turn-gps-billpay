/* eslint no-param-reassign: ["error", { "props": false }] */
import { auth, https, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import axios from 'axios';
import { WSDL } from 'soap';
import setupFirebase from '../firebase.js';
import { axiosConfig, createUserWithoutUserinfoAndReturnIdData, WSDL_CONTENT } from '../soap/soapUtils.js';
import {
  checkTrimbleEmailExists,
  checkTrimbleLoginExists,
  checkTrimbleOrgExists,
  createTrimbleOrg,
  insertRoleGroup,
  insertTrimbleSubscription,
  insertTrimbleSubscriptionItem,
  selectPrimaryLoginByUserId,
  updateTrimbleUser
} from '../db/service/databaseService.js';

setupFirebase();

export const createTrimbleUser = async (request) => {
  if (!request.auth) {
    info('unauthenticated request', { structuredData: true });
    throw new auth.HttpsError('unauthenticated', 'You must log in');
  }
  logger.info('authData email', request.auth.token.email);
  const { data } = request;
  logger.info('data', request.data);

  try {
    const emailExists = await checkTrimbleEmailExists(data.email);
    info('[createTrimbleUser :: emailExists]', emailExists);
    if (emailExists[0].emailExists === 1) {
      data.additionalEmail = [data.additionalEmail, request.auth.token.email].filter((str) => str).join(',');
      data.email = `${data.email}-${Date.now()}`;
    }
  } catch (err) {
    error('[createTrimbleUser :: emailExists] database error', err);
  }

  try {
    const organization = await checkTrimbleOrgExists(data.organization);
    info('[createTrimbleUser :: orgExists]', organization);
    await buildSoapData(organization, data);
  } catch (err) {
    error('[createTrimbleUser :: orgExists] database error', err);
  }

  const trimbleResult = await trimblePostCall(request.data);
  const soapResult = trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse?.CreateUserWithoutUserinfoAndReturnIDResult;
  await parseSoapResult(soapResult, trimbleResult, data);
  return 'ok';
};

async function parseSoapResult(soapResult, trimbleResult, data) {
  const ROLE_GROUP = 'TNC user';
  const MAIN_CONTRACT = 1;
  if (soapResult && soapResult === 'Success') {
    // more stuff
    data.userId = trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse?.userId;
    // update user
    const userResult = await updateTrimbleUser(data);
    if (userResult?.rowsAffected?.length) {
      // eslint-disable-next-line no-console
      console.log('User successfully updated');
    }
    const primaryLoginId = await selectPrimaryLoginByUserId(data.userId);

    await insertRoleGroup(primaryLoginId[0].loginId, ROLE_GROUP);

    const subscriptionData = { contractId: MAIN_CONTRACT, loginId: primaryLoginId[0].loginId };
    const subscriptionId = await insertTrimbleSubscription(subscriptionData);
    await insertTrimbleSubscriptionItem(subscriptionId[0].id);
  } else {
    throw new https.HttpsError('internal', soapResult);
  }
}

async function buildSoapData(organization, data) {
  if (organization?.length) {
    const loginExists = await checkTrimbleLoginExists(organization[0].OrganizationId, data.username);
    if (loginExists[0].loginExists === 1) {
      data.username = `${data.username}-${Date.now()}`;
    }
    data.loginWithOrganization = `${organization[0].ShortName}/${data.username}`;
    data.primaryLoginWithOrganization = `${organization[0].ShortName}/${data.username}`;
    data.organizationId = organization[0].OrganizationId;
  } else {
    const orgId = await createTrimbleOrg(data.organization);
    if (orgId) {
      data.loginWithOrganization = `${data.organization}/${data.username}`;
      data.primaryLoginWithOrganization = `${data.organization}/${data.username}`;
      data.organizationId = orgId[0].id;
    }
  }
}

async function trimblePostCall(requestData) {
  const SECRETS = process.env.secrets ? JSON.parse(process.env.secrets) : { trimble: {} };
  const { url } = SECRETS.trimble;
  const wsdl = new WSDL(WSDL_CONTENT, null, {});

  const userObj = {
    loginWithOrganization: requestData.loginWithOrganization,
    organizationId: requestData.organizationId,
    password: requestData.password,
    primaryLoginWithOrganization: requestData.primaryLoginWithOrganization,
    email: requestData.email,
  };

  const data = createUserWithoutUserinfoAndReturnIdData(userObj);
  const response = await axios.post(url, data, axiosConfig);
  // Optionally, deserialize request and return response status.
  return wsdl.xmlToObject(response.data);
}
