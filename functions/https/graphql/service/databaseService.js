import sql from 'mssql';
import CacheableLookup from 'cacheable-lookup';

const cacheable = new CacheableLookup();
cacheable.servers = [
  '8.8.8.8', // google
  '8.8.4.4', // google
  '204.113.19.5', // ns1 state of utah
  '204.113.4.5', // ns2 state of utah
];

cacheable.lookupAsync("itdb002gp")
  .then(response => {
    console.log('itdb002gp', response.address);
  })
  .catch((error) => {
    console.error(error);
  });

const DB = process.env.database ? JSON.parse(process.env.database) : {};
const sqlConfig = {
  user: DB.user.toUpperCase(),
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

