import { https } from 'firebase-functions/v1';
import gqlServer from './graphql/server.mjs';

const server = gqlServer();

const api = https.onRequest(server);

export default api;