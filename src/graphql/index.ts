import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import moment from 'moment';
import rawSchema from './schema';
import rootResolver from './resolvers';
import * as clients from './clients';
import express from 'express'

const { knex } = clients;

const useApolloMiddleware = (app: express.Application) => {
  const schema = makeExecutableSchema({
    typeDefs: gql(rawSchema),
    resolvers: rootResolver,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      if (req) {
        let loggedInUser;
        const { sessionKey } = req.cookies;
        if (sessionKey) {
          const rawMoment = moment().format('YYYY-MM-DD HH:mm:ss');
          loggedInUser = await knex('user')
              .select('*')
              .where('sessionKey', sessionKey)
              .andWhere('sessionExpiry', '>', rawMoment)
              .first();
        }

        if (!loggedInUser) {
          throw new Error(JSON.stringify({
            publicMessage: 'You must be logged in to do that!',
            type: 'NOT_LOGGED_IN'
          }));
        }

        const session = {
          user: loggedInUser,
          userId: loggedInUser.id
        };

        return {
          session,
          knex,
          clients
        };
      }
    }
  });

  const cors = {
    credentials: true,
    origin: env.CLIENT_URL,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token'
    ]
  };

  apolloServer.applyMiddleware({
    path: '/graphql',
    app,
    cors
  });
};

export default useApolloMiddleware;
