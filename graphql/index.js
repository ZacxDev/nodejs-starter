import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import moment from 'moment';
import rawSchema from './schema';
import rootResolver from './resolvers';

const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  DB_SOCKET_CONNECTION_STRING,
  MYSQL_CONNECTION_STRING,
  NODE_ENV
} = env;

const useApolloMiddleware = app => {
  let connectionParams = MYSQL_CONNECTION_STRING;

  if (NODE_ENV === 'production') {
    connectionParams = {
      user: 'root',
      password: MYSQL_ROOT_PASSWORD,
      database: MYSQL_DATABASE,
      socketPath: DB_SOCKET_CONNECTION_STRING
    };
  }

  const schema = makeExecutableSchema({
    typeDefs: gql(rawSchema),
    resolvers: rootResolver,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const knex = require('knex')({
        client: 'mysql',
        connection: connectionParams
      });
      if (req) {
        let loggedInUser;
        if (req.me) {
          loggedInUser = req.me;
        } else {
          const { sessionKey } = req.cookies;
          if (sessionKey) {
            const rawMoment = moment().format('YYYY-MM-DD HH:mm:ss');
            loggedInUser = await knex('user')
                .select('*')
                .where('sessionKey', sessionKey)
                .andWhere('sessionExpiry', '>', rawMoment)
                .first();
          }

          const session = loggedInUser ? {
            user: loggedInUser,
            userId: loggedInUser.id
          } : {};

          return {
            session,
            knex
          };
        }
      }
    }
  });

  const cors = {
    credentials: true,
    origin: env.CLIENT_URL || 'https://mobl.ca',
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
