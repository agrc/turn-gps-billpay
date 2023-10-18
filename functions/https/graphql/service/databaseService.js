import sql from 'mssql';

//const hostname = 'itdb002gp.utah.utad.state.ut.us'; //works

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

export const getRoleGroups =  async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select roleGroupName, description from [TPPDBAccounting].[dbo].[RoleGroups]`;
    return result?.recordset;
  } catch (err) {
    console.error(err);
  }
};

export const getRoles =  async () => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`select roleName, description from [TPPDBAccounting].[dbo].[Roles]`;
    return result?.recordset;
  } catch (err) {
    console.error(err);
  }
};
