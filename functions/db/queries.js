const DB = process.env.secrets ? JSON.parse(process.env.secrets) : { database: {} };
const schema = `[${DB.database.name}]`;

export const getRolesQuery = `select roleName, description from ${schema}.[dbo].[Roles]`;

export const checkOrderExistsQuery = 'select ID as orderId '
+ `from ${schema}.[dbo].[ECommerceOrders] `
+ 'where paymentToken = @paymentToken';

export const checkTrimbleUserExistsQuery = 'SELECT users.UserId, users.OrganizationId, users.PrimaryLogin, users.Email, users.AdditionalEmail, users.FirstName, users.LastName '
  + `from ${schema}.[dbo].[Users] users `
  + 'WHERE users.Deleted = 0 '
  + 'and users.AdditionalEmail is not null '
  + 'and users.AdditionalEmail != \'\' '
  + 'and users.AdditionalEmail like \'%\' + @email + \'%\' '
  + 'or '
  + 'users.Deleted = 0 '
  + 'and users.Email = @email';

export const checkTrimbleEmailExistsQuery = 'SELECT count(*) as emailExists '
  + `FROM ${schema}.[dbo].[Users] users `
  + 'WHERE email = @email and Deleted = 0';

export const checkTrimbleOrgExistsQuery = 'SELECT org.ShortName, org.OrganizationId '
  + `FROM ${schema}.[dbo].[Organizations] org `
  + 'WHERE upper(org.ShortName) = upper( @orgName ) '
  + 'and org.Deleted = 0';

export const checkTrimbleLoginExistsQuery = 'SELECT count(*) as loginExists '
  + `FROM ${schema}.[dbo].[Logins] logins `
  + 'WHERE upper(logins.LoginName) = upper( @username ) '
  + 'and logins.OrganizationId = @orgId '
  + 'and logins.Deleted = 0';

export const checkTrimbleLoginExistsByOrgNameQuery = 'SELECT count(*) as loginExists '
  + `FROM ${schema}.[dbo].[Logins] logins `
  + 'WHERE logins.OrganizationId = ( '
  + 'SELECT OrganizationId '
  + `FROM ${schema}.[dbo].[Organizations] `
  + 'WHERE upper(ShortName) = upper( @orgName ) '
  + ') '
  + 'and upper(logins.LoginName) = upper( @username ) '
  + 'and logins.Deleted = 0';
export const selectPrimaryLoginByUserIdQuery = 'SELECT users.PrimaryLogin as loginId '
  + `FROM ${schema}.[dbo].[Users] users `
  + 'WHERE users.UserId = @userId';

export const getSubscriptionsByEmailQuery = 'SELECT '
  + 'subscription.SubscriptionId as subscriptionId '
  + ',subscription.ContractId as contractId '
  + ',contracts.ContractName as contractName '
  + ',contractItems.Price as contractPrice '
  + ',login.OrganizationId as organizationId '
  + ',login.UserId as userId '
  + ',login.LoginName as loginName '
  + ',users.Email as email '
  + ',users.AdditionalEmail as additionalEmail '
  + ',convert(varchar, subscription.EffectiveDateUtc, 110) as effectiveDate '
  + ',convert(varchar, subscription.ExpirationDateUtc, 110) as expirationDate '
  + ',subscription.Activated as activated '
  + ',subscription.OrderNumber as orderNumber '
  + `FROM ${schema}.[dbo].[Subscriptions] subscription `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Logins] login on (subscription.LoginId = login.LoginId) `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Users] users on (login.UserId = users.UserId) `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Contracts] contracts on (subscription.ContractId = contracts.ContractId) `
  + `LEFT OUTER JOIN ${schema}.[dbo].[ContractItems] contractItems on (subscription.ContractId = contractItems.ContractId and contractItems.Priority = 0) `
  + 'WHERE subscription.LoginId in ( '
  + 'SELECT users.PrimaryLogin '
  + `FROM ${schema}.[dbo].[Users] users `
  + 'WHERE '
  + 'users.Deleted = 0 '
  + 'and users.AdditionalEmail is not null and users.AdditionalEmail != \'\' '
  + 'and users.AdditionalEmail like \'%\'+ @email + \'%\'  '
  + 'or '
  + 'users.Deleted = 0 '
  + 'and users.Email = @email '
+ ') '
+ 'and subscription.ExpirationDateUtc >= CURRENT_TIMESTAMP '
+ 'order by subscription.LoginId, subscription.SubscriptionId';

export const getTrimbleProfileByEmailQuery = 'SELECT '
  + 'org.ShortName as organization, FirstName as firstName, LastName as lastName, email, Address as address1, City as city, District as stateCode, ZipCode as zipCode, PhoneNumberMobile as phoneNumber '
  + `FROM ${schema}.[dbo].[Users] users `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Organizations] org on (users.OrganizationId = org.OrganizationId) `
  + 'WHERE Email = @email';

export const createTrimbleOrgQuery = 'INSERT INTO '
  + `${schema}.[dbo].[Organizations] `
  + '(ShortName, LongName, Description, Deleted, IsDealerOrganization) '
  + 'VALUES '
  + '(@orgName, @orgName, @orgName, 0, 0); '
  + 'SELECT SCOPE_IDENTITY() AS id;';

export const insertOrderQuery = 'INSERT INTO '
  + `${schema}.[dbo].[ECommerceOrders] `
  + '(OrderUUID, OrganizationID, CreatedDateUtc, CreatedByUserID, Status, IsCompleted, AmountMoney, PaymentToken) '
  + 'VALUES '
  + '(@uuid, @orgId, GETUTCDATE(), @userId, 0, 0, @totalPrice, @govPayToken); '
  + 'SELECT SCOPE_IDENTITY() AS id;';

export const insertOrderItemQuery = 'INSERT INTO '
  + `${schema}.[dbo].[ECommerceOrderItems] `
  + '(OrderID, UserID, OrganizationID, ContractID, Name, Description, OrderItemType, RenewalOfSubscriptionID, AmountMoney) '
  + 'VALUES '
  + '(@orderId, @userId, @organizationId, @contractId, @loginName, @contractName, 0, @subscriptionId, @contractPrice); '
  + 'SELECT SCOPE_IDENTITY() AS id;';

export const insertRoleGroupQuery = 'INSERT INTO '
  + `${schema}.[dbo].[LoginsInRoleGroups] `
  + '(LoginId, RoleGroup) '
  + 'VALUES '
  + '(@loginId, @roleGroup)';

export const updateTrimbleUserQuery = 'UPDATE '
  + `${schema}.[dbo].[Users] `
  + 'set FirstName = @firstName, '
  + 'LastName = @lastName, '
  + 'AdditionalEmail = @additionalEmail, '
  + 'Address = @address1, '
  + 'Address2 = @address2, '
  + 'City = @city, '
  + 'District = @stateCode, '
  + 'ZipCode = @zipCode, '
  + 'PhoneNumberMobile = @phoneNumber '
  + 'WHERE '
  + 'UserId = @userId';

export const updateOrderQuery = 'UPDATE '
  + `${schema}.[dbo].[ECommerceOrders] `
  + 'set StatusMessage = @paymentMethod, '
  + 'IsCompleted = 1 '
  + 'WHERE '
  + 'PaymentToken = @paymentToken';

export const updateSubscriptionQuery = 'UPDATE '
  + `${schema}.[dbo].[Subscriptions] `
  + 'set Activated = 1, '
  + 'PurchaseDateUtc = GETUTCDATE() '
  + 'WHERE '
  + 'SubscriptionId in ( '
  + 'select RenewalOfSubscriptionID '
  + `from ${schema}.[dbo].[ECommerceOrderItems] `
  + 'where OrderID = @orderId )';

export const insertTrimbleSubscriptionQuery = 'INSERT INTO '
  + `${schema}.[dbo].[Subscriptions] `
  + '(LoginId, ContractId, PurchaseDateUtc, EffectiveDateUtc, ExpirationDateUtc, Activated, Followup, FollowupContractId, FollowupNeedsActivation, OrderNumber) '
  + 'VALUES '
  + '(@loginId, @contractId, GETUTCDATE(), GETUTCDATE(), DATEADD(year, 1, GETUTCDATE()) ,0, 1, @contractId, 1, @orderNumber); '
  + 'SELECT SCOPE_IDENTITY() AS id;';

export const getRoleGroupsQuery = 'select roleGroups.RoleGroup '
  + `from ${schema}.[dbo].[Users] users `
  + `LEFT OUTER JOIN ${schema}.[dbo].[Logins] logins ON (users.PrimaryLogin = logins.LoginId) `
  + `LEFT OUTER JOIN ${schema}.[dbo].[LoginsInRoleGroups] roleGroups ON (logins.LoginId = roleGroups.LoginId) `
  + 'where users.Deleted = 0 '
  + 'and users.Email = @email';
