import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import 'dotenv/config'

import schema from './schema.mjs';
import resolvers from './resolvers.mjs';

export const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  // Enable graphiql gui
  introspection: true,
  playground: true
});

apolloServer.start().then(() => apolloServer.applyMiddleware({app: expressServer, path: '/', cors: true}));

export const expressServer = express();