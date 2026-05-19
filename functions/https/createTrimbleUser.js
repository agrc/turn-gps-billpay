/* eslint no-param-reassign: ["error", { "props": false }] */
import { https, logger } from 'firebase-functions/v1';
import { error, info } from 'firebase-functions/logger';
import axios from 'axios';
import { WSDL } from 'soap';
import setupFirebase from '../firebase.js';
import {
  axiosConfig,
  createUserWithoutUserinfoAndReturnIdData,
  WSDL_CONTENT,
} from '../soap/soapUtils.js';
import {
  checkTrimbleEmailExists,
  checkTrimbleLoginExists,
  checkTrimbleOrgExists,
  createTrimbleOrg,
  insertRoleGroup,
  insertTrimbleSubscription,
  insertTrimbleSubscriptionItem,
  selectPrimaryLoginByUserId,
  updateTrimbleUser,
} from '../db/service/databaseService.js';

setupFirebase();

export const createTrimbleUser = async (request) => {
  if (!request.auth) {
    info('unauthenticated request', { structuredData: true });
    throw new https.HttpsError('unauthenticated', 'You must log in');
  }
  const { data } = request;

  logger.info('[createTrimbleUser :: request]', {
    authEmail: request.auth.token.email,
    data: safeLogValue(data),
    structuredData: true,
  });

  try {
    const emailExists = await checkTrimbleEmailExists(data.email);
    info('[createTrimbleUser :: emailExists]', {
      emailExists,
      email: data.email,
      structuredData: true,
    });

    if (emailExists?.[0]?.emailExists === 1) {
      data.additionalEmail = [data.additionalEmail, request.auth.token.email]
        .filter((str) => str)
        .join(',');
      data.email = `${data.email}-${Date.now()}`;

      info('[createTrimbleUser :: emailExists] duplicate email renamed', {
        email: data.email,
        additionalEmail: data.additionalEmail,
        structuredData: true,
      });
    }

    const organization = await checkTrimbleOrgExists(data.organization);
    info('[createTrimbleUser :: orgExists]', {
      organization,
      organizationName: data.organization,
      structuredData: true,
    });

    await buildSoapData(organization, data);
    info('[createTrimbleUser :: soapData]', {
      data: safeLogValue(data),
      structuredData: true,
    });

    const trimbleResult = await trimblePostCall(data);
    info('[createTrimbleUser :: trimblePostCall]', {
      trimbleResult: safeLogValue(trimbleResult),
      structuredData: true,
    });

    const soapResult =
      trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse
        ?.CreateUserWithoutUserinfoAndReturnIDResult;

    await parseSoapResult(soapResult, trimbleResult, data);

    info('[createTrimbleUser :: success]', {
      email: data.email,
      username: data.username,
      organization: data.organization,
      userId: data.userId,
      structuredData: true,
    });

    return 'ok';
  } catch (err) {
    logError('unhandled', err, {
      authEmail: request.auth.token.email,
      data: safeLogValue(data),
    });

    if (err instanceof https.HttpsError) {
      throw err;
    }

    throw new https.HttpsError(
      'internal',
      'Failed to create Trimble user. See function logs for details.',
    );
  }
};

async function parseSoapResult(soapResult, trimbleResult, data) {
  const ROLE_GROUP = 'TNC user';
  const MAIN_CONTRACT = 1;
  if (soapResult && soapResult === 'Success') {
    // more stuff
    data.userId =
      trimbleResult?.Body?.CreateUserWithoutUserinfoAndReturnIDResponse?.userId;
    // update user
    const userResult = await updateTrimbleUser(data);
    info('[createTrimbleUser :: updateTrimbleUser]', {
      rowsAffected: userResult?.rowsAffected,
      userId: data.userId,
      structuredData: true,
    });

    if (userResult?.rowsAffected?.length) {
      info(
        '[createTrimbleUser :: updateTrimbleUser] user successfully updated',
        {
          userId: data.userId,
          structuredData: true,
        },
      );
    }

    const primaryLoginId = await selectPrimaryLoginByUserId(data.userId);
    info('[createTrimbleUser :: selectPrimaryLoginByUserId]', {
      primaryLoginId,
      userId: data.userId,
      structuredData: true,
    });

    await insertRoleGroup(primaryLoginId[0].loginId, ROLE_GROUP);
    info('[createTrimbleUser :: insertRoleGroup]', {
      loginId: primaryLoginId[0].loginId,
      roleGroup: ROLE_GROUP,
      structuredData: true,
    });

    const subscriptionData = {
      contractId: MAIN_CONTRACT,
      loginId: primaryLoginId[0].loginId,
    };
    const subscriptionId = await insertTrimbleSubscription(subscriptionData);
    info('[createTrimbleUser :: insertTrimbleSubscription]', {
      subscriptionId,
      subscriptionData,
      structuredData: true,
    });

    await insertTrimbleSubscriptionItem(subscriptionId[0].id);
    info('[createTrimbleUser :: insertTrimbleSubscriptionItem]', {
      subscriptionId: subscriptionId[0].id,
      structuredData: true,
    });
  } else {
    error('[createTrimbleUser :: parseSoapResult] non-success SOAP response', {
      soapResult,
      trimbleResult: safeLogValue(trimbleResult),
      structuredData: true,
    });

    throw new https.HttpsError('internal', soapResult);
  }
}

async function buildSoapData(organization, data) {
  if (organization?.length) {
    const loginExists = await checkTrimbleLoginExists(
      organization[0].OrganizationId,
      data.username,
    );
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
  const SECRETS = process.env.secrets
    ? JSON.parse(process.env.secrets)
    : { trimble: {} };
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
  try {
    info('[createTrimbleUser :: trimblePostCall] request', {
      userObj: safeLogValue(userObj),
      hasUrl: Boolean(url),
      structuredData: true,
    });

    const response = await axios.post(url, data, axiosConfig);
    info('[createTrimbleUser :: trimblePostCall] response', {
      status: response.status,
      statusText: response.statusText,
      structuredData: true,
    });

    return wsdl.xmlToObject(response.data);
  } catch (err) {
    throw err;
  }
}

function logError(stage, err, context = {}) {
  error(`[createTrimbleUser :: ${stage}]`, {
    ...context,
    error: serializeError(err),
    structuredData: true,
  });
}

function serializeError(err) {
  if (!err) {
    return err;
  }

  const serialized = {
    name: err.name,
    message: err.message,
    code: err.code,
    details: err.details,
    stack: err.stack,
  };

  if (err.cause) {
    serialized.cause = serializeError(err.cause);
  }

  if (err.response) {
    serialized.response = {
      status: err.response.status,
      statusText: err.response.statusText,
      data: safeLogValue(err.response.data),
    };
  }

  if (err.config) {
    serialized.request = {
      method: err.config.method,
      url: err.config.url,
      timeout: err.config.timeout,
    };
  }

  return serialized;
}

function safeLogValue(value) {
  if (value === undefined || value === null) {
    return value;
  }

  if (typeof value === 'string') {
    return truncate(value);
  }

  try {
    return JSON.parse(JSON.stringify(value, redactSensitiveValue));
  } catch (err) {
    return truncate(String(value));
  }
}

function redactSensitiveValue(key, value) {
  const sensitiveKeys = [
    'password',
    'apikey',
    'authorization',
    'token',
    'confirmpassword',
  ];

  if (sensitiveKeys.includes(key.toLowerCase())) {
    return '[redacted]';
  }

  if (typeof value === 'string') {
    return truncate(value);
  }

  return value;
}

function truncate(value) {
  const MAX_LOG_LENGTH = 5000;

  if (value.length <= MAX_LOG_LENGTH) {
    return value;
  }

  return `${value.slice(0, MAX_LOG_LENGTH)}... [truncated]`;
}
