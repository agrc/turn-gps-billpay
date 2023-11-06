const prodSchema = '[TPPDBAccounting]';
const devSchema = '[TPPDB3Accounting]';
const schema = !process.env.LOCALMSSQL && process.env.GCLOUD_PROJECT.includes('dev') ? devSchema : prodSchema;

export const getRolesQuery = `select roleName, description from ${schema}.[dbo].[Roles]`;

export const getPaymentRecordQuery = `select roleGroupName, description from ${schema}.[dbo].[RoleGroups] where roleGroupName = @token`;

export const checkTrimbleUserExistsQuery = 'SELECT users.UserId, users.OrganizationId, users.PrimaryLogin, users.Email, users.AdditionalEmail, users.FirstName, users.LastName '
  + `from ${schema}.[dbo].[Users] users `
  + 'WHERE users.Deleted = 0 '
  + 'and users.AdditionalEmail is not null '
  + 'and users.AdditionalEmail != \'\' '
  + 'and users.AdditionalEmail like \'%\' + @email + \'%\' '
  + 'or '
  + 'users.Deleted = 0 '
  + 'and users.Email = @email';
export const getRoleGroupsQuery = 'select roleGroups.RoleGroup '
  + `from ${schema}.[dbo].[Users] users `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Logins] logins ON (users.PrimaryLogin = logins.LoginId) `
  + `LEFT OUTER JOIN ${schema}.[dbo].[LoginsInRoleGroups] roleGroups ON (logins.LoginId = roleGroups.LoginId) `
  + 'where users.Deleted = 0 '
  + 'and users.Email = @email';
