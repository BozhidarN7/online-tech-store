import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import fs from 'fs';

import config from './config/config.js';
import expressConfig from './config/expressConfig.js';
import dataBaseConfig from './config/dataBaseConfig.js';
import { firebaseConfig } from './config/firebaseConfig.js';
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutations.js';
import preloadUserData from './utils/preloadUserData.js';

const resolvers = {
    Query,
    Mutation,
};

const graphqlSchema = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
const typeDefs = gql`
    ${graphqlSchema}
`;

async function startApp() {
    const app = express();
    expressConfig(app);
    firebaseConfig();
    await dataBaseConfig();

    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: async ({ req }) => {
            const user = await preloadUserData(req);

            return { user };
        },
    });

    await server.start();
    server.applyMiddleware({ app, path: '/' });

    httpServer.listen(config.PORT, () => console.log(`Server is listening on port ${config.PORT}`));
}

startApp();
