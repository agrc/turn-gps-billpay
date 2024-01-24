import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import schema from './schema.js';
import resolvers from './resolvers.js';

export const expressServer = express();
export const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});

apolloServer.start().then(() => apolloServer.applyMiddleware({ app: expressServer, path: '/', cors: true }));
