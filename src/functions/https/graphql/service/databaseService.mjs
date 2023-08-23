import sql from 'mssql';

const DB = process.env.DB ? JSON.parse(process.env.DB) : {};
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

export const getRoleGroups =  async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select roleGroupName, description from [TPPDBAccounting].[dbo].[RoleGroups]`;
    console.dir(result);
    return result?.recordset;
  } catch (err) {
    console.error(err);
  }
};

export const getRoles =  async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select * from [TPPDBAccounting].[dbo].[Roles]`;
    console.dir(result);
    return result?.recordset;
  } catch (err) {
    console.error(err);
  }
};

