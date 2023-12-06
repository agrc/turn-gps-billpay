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
  } catch (err) {
    error('[createTrimbleUser :: orgExists] database error', err);
  }

  const trimbleResult = await trimblePostCall(request.data);
  const soapResult = trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse?.CreateUserWithoutUserinfoAndReturnIDResult;
  if (soapResult && soapResult === 'Success') {
    // more stuff
    data.userId = trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse?.userId;
    // update user
    const userResult = await updateTrimbleUser(data);
    if (userResult?.rowsAffected?.length) {
      console.log('User successfully updated');
    }
    const primaryLoginId = await selectPrimaryLoginByUserId(data.userId);
    const subscriptionData = { contractId: 1, loginId: primaryLoginId[0].loginId };
    // insert 'TNC User' role into LoginsInRoleGroups
    await insertRoleGroup(primaryLoginId[0].loginId, 'TNC User');
    const subscriptionId = await insertTrimbleSubscription(subscriptionData);
    await insertTrimbleSubscriptionItem(subscriptionId[0].id);
  } else {
    console.log('errorResult', soapResult);
    throw new https.HttpsError('internal', soapResult);
  }
  return 'ok';
};

async function trimblePostCall(requestData) {
  const url = 'http://turngps.dev.utah.gov:31040/Trimble.IS.AccountingServices/LoginService/soap';

  // console.log(WSDL_CONTENT);
  const wsdl = new WSDL(WSDL_CONTENT, null, {});

  const userObj = {
    loginWithOrganization: requestData.loginWithOrganization,
    organizationId: requestData.organizationId,
    password: requestData.password,
    primaryLoginWithOrganization: requestData.primaryLoginWithOrganization,
    email: requestData.email,
  };
  console.log('userObj', userObj);

  const data = createUserWithoutUserinfoAndReturnIdData(userObj);
  // const objectBody = wsdl.objectToXML(userObj, 'CreateUserWithoutUserinfoAndReturnID', 'ns2', 'http://schemas.datacontract.org/2004/07/Trimble.IS.AccountingData');
  // console.log('objectBody', objectBody);

  const response = await axios.post(url, data, axiosConfig);
  // Optionally, deserialize request and return response status.
  const object = wsdl.xmlToObject(response.data);
  console.log('object', object);
  return object;
}
