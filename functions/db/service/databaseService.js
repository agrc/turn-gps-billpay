/* eslint-disable consistent-return */
import sql from 'mssql';
import {
  getRoleGroupsQuery, getRolesQuery, getPaymentRecordQuery, checkTrimbleUserExistsQuery
} from '../queries.js';

// const hostname = 'itdb002gp.utah.utad.state.ut.us'; //works

const DB = process.env.database ? JSON.parse(process.env.database) : {};
export const sqlConfig = {
  user: DB.user,
  password: DB.password,
  database: DB.name,
  server: DB.server,
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
    await sql.connect(sqlConfig);
    const result = await sql.query(getRoleGroupsQuery);
    return result?.recordset;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(err);
  }
};

export const getRoles = async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query(getRolesQuery);
    return result?.recordset;
  } catch (err) {
    /* eslint-disable no-console */
    console.error(err);
  }
};

export const getPaymentRecord = async (message) => {
  if (message) {
    await sql.connect(sqlConfig);
    const request = new sql.Request();
    request.input('token', sql.VarChar, message);
    const result = await request.query(getPaymentRecordQuery);
    return result?.recordset;
  }
  return null;
};

export const checkTrimbleUserExists = async (email) => {
  if (email) {
    await sql.connect(sqlConfig);
    const request = new sql.Request();
    request.input('email', sql.VarChar, email);
    const result = await request.query(checkTrimbleUserExistsQuery);
    return result?.recordset;
  }
  return null;
};
