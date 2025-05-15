import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import { GraphQLError } from 'graphql';
import { getAuth } from 'firebase-admin/auth';
import path from 'path';
import resolvers from './resolvers.js';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const typeDefs = fs.readFileSync(path.join(dirname, '/schema.graphql')).toString('utf-8');

const corsOptions = {
  origin: [
    /ut-dts-agrc-turn-gps-dev\.firebaseapp\.com$/,
    /ut-dts-agrc-turn-gps-prod\.firebaseapp\.com$/,
    /utah\.gov$/,
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,POST',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const graphqlAuthError = {
  extensions: {
    code: 'UNAUTHENTICATED',
    http: {status: 401},
  }
};

const authMiddleware = {
  context: (
    async ({ req }) => {
      const token = req.headers.authorization || '';
      if (token) {
        try {
          const decodedToken = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
          return { user: decodedToken };
        } catch (error) {
          throw new GraphQLError('User is not authenticated', graphqlAuthError);
        }
      }
      throw new Error('No token provided');
    }),
};

export const expressServer = express();

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  playground: process.env.NODE_ENV !== 'production',
});

apolloServer.start()
  .then(() => {
    expressServer.use(
      '/',
      cors(corsOptions),
      express.json(),
      expressMiddleware(apolloServer, authMiddleware)
    );
  })
  .catch((error) => {
    console.error('Error starting Apollo Server:', error);
  });
