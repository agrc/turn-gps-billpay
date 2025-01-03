// import packageJSON from '../../package.json' with { type: 'json' };
import {
  checkTrimbleLoginExistsByOrgName,
  getRoleGroups,
  getRoles,
} from '../../db/service/databaseService.js';
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const path = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../package.json',
);
const packageJSON = JSON.parse(fs.readFileSync(path, 'utf8'));

const resolverFunctions = {
  Query: {
    version: () => packageJSON.version,
    getRoleGroups: () => getRoleGroups(),
    getRoles: () => getRoles(),
    checkLoginExists: (_, variables) =>
      checkTrimbleLoginExistsByOrgName(variables),
  },
};

export default resolverFunctions;
