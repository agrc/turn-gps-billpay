import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import cors from 'cors';
import { getAuth } from 'firebase-admin/auth';
import schema from './schema.js';
import resolvers from './resolvers.js';

const corsOptions = {
  origin: [/ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/, /ut-dts-agrc-turn-gps-prod\.firebaseapp\.com$/, /utah\.gov$/],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204
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
