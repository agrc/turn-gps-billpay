/* eslint-disable no-console */
import packageJSON from '../../package.json' assert {type: 'json'};
import { checkTrimbleLoginExistsByOrgName, getRoleGroups, getRoles } from '../../db/service/databaseService.js';

const resolverFunctions = {
  Query: {
    version: () => packageJSON.version,
    getRoleGroups: () => getRoleGroups(),
    getRoles: () => getRoles(),
    checkLoginExists: (_, variables) => checkTrimbleLoginExistsByOrgName(variables),
  },
};

export default resolverFunctions;
