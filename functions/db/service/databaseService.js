/* eslint-disable consistent-return */
import sql from 'mssql';
import {
  getRoleGroupsQuery,
  getRolesQuery,
  checkTrimbleUserExistsQuery,
  checkTrimbleEmailExistsQuery,
  checkTrimbleOrgExistsQuery,
  createTrimbleOrgQuery,
  updateTrimbleUserQuery,
  insertTrimbleSubscriptionQuery,
  selectPrimaryLoginByUserIdQuery,
  checkTrimbleLoginExistsQuery,
  getSubscriptionsByEmailQuery,
  insertOrderQuery,
  insertOrderItemQuery,
  checkOrderExistsQuery,
  updateOrderQuery,
  insertRoleGroupQuery,
  getTrimbleProfileByEmailQuery,
  updateSubscriptionQuery,
  checkTrimbleLoginExistsByOrgNameQuery,
} from '../queries.js';

const DB = process.env.secrets ? JSON.parse(process.env.secrets) : { database: {} };
export const sqlConfig = {
  user: DB.database.user,
  password: DB.database.password,
  database: DB.database.name,
  server: DB.database.server,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getRoleGroups = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.query(getRoleGroupsQuery);
    return result?.recordset;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(err);
  }
};

export const getRoles = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.query(getRolesQuery);
    return result?.recordset;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(err);
  }
};

export const checkOrderExists = async (paymentToken) => {
  if (paymentToken) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('paymentToken', sql.VarChar, paymentToken)
      .query(checkOrderExistsQuery);
    return result?.recordset;
  }
  return null;
};

export const checkTrimbleUserExists = async (email) => {
  if (email) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(checkTrimbleUserExistsQuery);
    return result?.recordset;
  }
  return null;
};

export const checkTrimbleEmailExists = async (email) => {
  if (email) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(checkTrimbleEmailExistsQuery);
    return result?.recordset;
  }
  return null;
};

export const checkTrimbleOrgExists = async (orgName) => {
  if (orgName) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orgName', sql.VarChar, orgName)
      .query(checkTrimbleOrgExistsQuery);
    return result?.recordset ? result.recordset : null;
  }
  return null;
};

export const checkTrimbleLoginExists = async (orgId, username) => {
  if (orgId && username) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orgId', sql.Numeric, orgId)
      .input('username', sql.VarChar, username)
      .query(checkTrimbleLoginExistsQuery);
    return result?.recordset ? result.recordset : null;
  }
  return null;
};

export const checkTrimbleLoginExistsByOrgName = async (variables) => {
  if (variables) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orgName', sql.VarChar, variables?.orgName)
      .input('username', sql.VarChar, variables?.loginName)
      .query(checkTrimbleLoginExistsByOrgNameQuery);
    return result?.recordset ? result.recordset[0] : null;
  }
  return null;
};

export const selectPrimaryLoginByUserId = async (userId) => {
  if (userId) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('userId', sql.Numeric, userId)
      .query(selectPrimaryLoginByUserIdQuery);
    return result?.recordset ? result.recordset : null;
  }
  return null;
};

export const getSubscriptionsByEmail = async (email) => {
  if (email) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(getSubscriptionsByEmailQuery);
    return result?.recordset ? result.recordset : null;
  }
  return null;
};

export const getTrimbleProfileByEmail = async (email) => {
  if (email) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query(getTrimbleProfileByEmailQuery);
    return result?.recordset ? result.recordset : null;
  }
  return null;
};

export const createTrimbleOrg = async (orgName) => {
  if (orgName) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orgName', sql.VarChar, orgName)
      .query(createTrimbleOrgQuery);
    return result?.recordset;
  }
  return null;
};

export const updateTrimbleUser = async (user) => {
  if (user) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('firstName', sql.VarChar, user.firstName)
      .input('lastName', sql.VarChar, user.lastName)
      .input('additionalEmail', sql.VarChar, user.additionalEmail)
      .input('address1', sql.VarChar, user.address1)
      .input('address2', sql.VarChar, user.address2)
      .input('city', sql.VarChar, user.city)
      .input('stateCode', sql.VarChar, user.stateCode)
      .input('zipCode', sql.VarChar, user.zipCode.toString())
      .input('phoneNumber', sql.VarChar, user.phoneNumber)
      .input('userId', sql.Numeric, user.userId)
      .query(updateTrimbleUserQuery);
    return result;
  }
  return null;
};

export const updateOrder = async (paymentToken, paymentMethod) => {
  if (paymentToken) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('paymentToken', sql.VarChar, paymentToken)
      .input('paymentMethod', sql.VarChar, paymentMethod)
      .query(updateOrderQuery);
    return result;
  }
  return null;
};

export const updateSubscription = async (orderId) => {
  if (orderId) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orderId', sql.Int, orderId)
      .query(updateSubscriptionQuery);
    return result;
  }
  return null;
};

export const insertTrimbleSubscription = async (subscription) => {
  if (subscription) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('loginId', sql.Numeric, subscription.loginId)
      .input('contractId', sql.Numeric, subscription.contractId)
      .input('orderNumber', sql.VarChar, 'GovPay Renewal')
      .query(insertTrimbleSubscriptionQuery);
    return result?.recordset;
  }
  return null;
};

export const insertOrder = async (order) => {
  if (order) {
    console.log('order', order);
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('uuid', sql.VarChar, order.uuid)
      .input('orgId', sql.Numeric, order.orgId)
      .input('userId', sql.Numeric, order.userId)
      .input('totalPrice', sql.Int, order.totalPrice)
      .input('govPayToken', sql.VarChar, order.govPayToken)
      .query(insertOrderQuery);
    return result?.recordset;
  }
  return null;
};

export const insertOrderItem = async (item) => {
  if (item) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('orderId', sql.Numeric, item.orderId)
      .input('userId', sql.Numeric, item.userId)
      .input('organizationId', sql.Numeric, item.organizationId)
      .input('contractId', sql.Numeric, item.contractId)
      .input('orderItemType', sql.Int, 0)
      .input('subscriptionId', sql.Numeric, item.subscriptionId)
      .input('contractPrice', sql.Numeric, item.contractPrice)
      .input('loginName', sql.VarChar, item.loginName)
      .input('contractName', sql.VarChar, item.contractName)
      .query(insertOrderItemQuery);
    return result?.recordset;
  }
  return null;
};

export const insertRoleGroup = async (loginId, roleGroup) => {
  if (loginId) {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .input('loginId', sql.Numeric, loginId)
      .input('roleGroup', sql.VarChar, roleGroup)
      .query(insertRoleGroupQuery);
    return result?.recordset;
  }
  return null;
};
export const insertTrimbleSubscriptionItem = async (subscriptionId) => {
  if (subscriptionId) {
    const values = [
      [subscriptionId, 2, 0],
      [subscriptionId, 3, 0],
      [subscriptionId, 4, 0],
      [subscriptionId, 5, 0],
      [subscriptionId, 8, 0],
    ];
    const table = new sql.Table('SubscriptionItemPrice');
    table.create = false;
    table.columns.add('SubscriptionId', sql.Int, { nullable: false });
    table.columns.add('ContractItemId', sql.Int, { nullable: false });
    table.columns.add('Price', sql.Float, { nullable: false });
    values.forEach((row) => table.rows.add.apply(table.rows, row));

    const pool = await sql.connect(sqlConfig);
    const result = await pool.request()
      .bulk(table);
    return result;
  }
  return null;
};
