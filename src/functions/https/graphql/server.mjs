import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {ErrorReporting} from '@google-cloud/error-reporting';
import 'dotenv/config'

import schema from './schema.mjs';
import resolvers from './resolvers.mjs';

async function gqlServer() {
  const errors = new ErrorReporting();
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({app, path: '/', cors: true});

  // Note that express error handling middleware should be attached after all
  // the other routes and use() calls. See the Express.js docs.
  app.use(errors.express);

  app.listen(process.env.PORT);

  if (process.env.isRunningLocal) {
    console.log('🚀🙂😀😃 Server is running on:' + ' ' + `http://localhost:${process.env.PORT}`);
  }

  return app;
}

export default gqlServer;