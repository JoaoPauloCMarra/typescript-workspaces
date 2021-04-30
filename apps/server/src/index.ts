import 'reflect-metadata';
import { cyan } from 'chalk';
import { ApolloServer } from 'apollo-server-express';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { buildSchema } from 'type-graphql';
import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';

import UserResolver from './resolvers/UserResolver';

const devMode = process.env.NODE_ENV === 'dev';
const PORT = 5000;

const onServerReady = () => {
  console.log(cyan(`\nServer running at http://localhost:${PORT}`));
};

(async () => {
  const app = express();
  app.use(cors());

  app.get('/', (_: Request, res: Response) => res.send('Server up and running...'));

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    playground: devMode,
    plugins: [responseCachePlugin()],
  });
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  await new Promise((resolve: any) => httpServer.listen(PORT, resolve));

  onServerReady();
})();
