/* eslint-disable no-console */
import packageJSON from '../../package.json' assert {type: 'json'};
import { getRoleGroups, getRoles } from '../../db/service/databaseService.js';

const resolverFunctions = {
  Query: {
    hello: () => 'world',
    version: () => packageJSON.version,
    getRoleGroups: () => getRoleGroups(),
    getRoles: () => getRoles(),
  },
};

export default resolverFunctions;
