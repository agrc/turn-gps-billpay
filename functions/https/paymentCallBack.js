import { error, info } from 'firebase-functions/logger';

import sql from 'mssql';

const DB = process.env.database ? JSON.parse(process.env.database) : {};
const sqlConfig = {
  user: DB.user,
  password: DB.password,
  database: DB.name,
  server: DB.server,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

export const paymentCallBack = async (request, response) => {
  const CAPTURE = 'CAPTURE';
  const REVERSE = 'REVERSE';

  if (request.method !== "POST") {
    error("HTTP Method Not Allowed");
    response.send(405, 'HTTP Method ' + request.method + ' not allowed');
  }
  let message = parseMessage(request);
  info('message', message);

  try {
    await sql.connect(sqlConfig);
    const request = new sql.Request();
    request.input('token', sql.VarChar, message);
    const result = await request.query('select roleGroupName, description from [TPPDBAccounting].[dbo].[RoleGroups] where roleGroupName = @token');
    return result?.recordset;
  } catch (err) {
    error('database error', err);
    response.status(200).send(REVERSE);
  }
  
  //need to send capture or reverse
  response.status(200).send(CAPTURE);

};

const parseMessage = (request) => {
  let body = "" ;
  switch (request.get('content-type')) {
    // '{"token":"token_xxx"}'
    case 'application/json':
      ({body} = request.body);
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
      ({body} = request.body);
      break;
  }

  // Create response
  let response = '{"value": "' + body + '"}';

  // Parse the response as JSON then return
  return JSON.parse(response);
};
