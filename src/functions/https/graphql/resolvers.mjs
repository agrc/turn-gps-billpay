import packageJSON from './../../../../package.json' assert {type: 'json'};
import {getRoleGroups, getRoles} from "./service/databaseService.mjs";

const resolverFunctions = {
  Query: {
    hello: () => 'world',
    version: () => packageJSON.version,
    getRoleGroups: () => getRoleGroups(),
    getRoles: () => getRoles(),
  }
};

export default resolverFunctions;