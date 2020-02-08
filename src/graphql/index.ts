import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import moment from 'moment';
import rawSchema from './schema';
import rootResolver from './resolvers';
import { createConnection } from 'Clients/KnexClient';
import { Express } from 'express';

const useApolloMiddleware = (app: Express): void => {
  const schema = makeExecutableSchema({
    typeDefs: gql(rawSchema),
    resolvers: rootResolver,
  });

  const knex = createConnection();
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => {
      if (req) {
        let loggedInUser;
        const { sessionKey } = req.cookies;
        if (sessionKey) {
          const rawMoment = moment.utc().format('YYYY-MM-DD HH:mm:ss');
          loggedInUser = await knex('user')
            .select('*')
            .where('sessionKey', sessionKey)
            .andWhere('sessionExpiry', '>', rawMoment)
            .first();

          if (!loggedInUser) {
            throw new Error('You must be logged in to do that!');
          }

          const session = {
            user: loggedInUser,
            userId: loggedInUser.id
          };
          const utcOffset = req.headers['x-utc-offset'];

          return {
            session,
            utcOffset: utcOffset as string
          };
        }
      }
    }
  });

  const cors = {
    credentials: true,
    origin: process.env.CLIENT_URL || 'https://mobl.ca',
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'x-utc-offset'
    ]
  };

  apolloServer.applyMiddleware({
    path: '/graphql',
    app,
    cors
  });
};

export default useApolloMiddleware;
