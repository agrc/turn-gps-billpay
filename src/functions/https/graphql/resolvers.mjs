import packageJSON from './../../../../package.json' assert {type: 'json'};

const resolverFunctions = {
  Query: {
    hello: () => 'world',
    version: () => packageJSON.version
  }
};

export default resolverFunctions;