import {version} from './package.json';

const resolverFunctions = {
  Query: {
    hello: () => 'world',
    version: () => version
  }
};

export default resolverFunctions;