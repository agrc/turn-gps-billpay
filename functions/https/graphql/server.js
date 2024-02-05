import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import schema from './schema.js';
import resolvers from './resolvers.js';

const corsOptions = {
  origin: false,
  credentials: true,
};

const CorsMiddleware = cors(corsOptions);
const authMiddleware = (request, response, next) => {
  const token = request.get('authorization');
  if (token) {
    getAuth()
      .verifyIdToken(token.replace('Bearer ', ''))
      .then(() => next())
      .catch(() => response.status(401).end());
  } else {
    response.status(401).end();
  }
};

export const expressServer = express();
expressServer.use(CorsMiddleware, authMiddleware);
export const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});

apolloServer.start().then(() => apolloServer.applyMiddleware({ app: expressServer, path: '/', cors: false }));
