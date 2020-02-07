import knexClient from 'knex';

export const createConnection = (): knexClient => {
  const {
    MYSQL_ROOT_PASSWORD,
    MYSQL_DATABASE,
    DB_SOCKET_CONNECTION_STRING,
    MYSQL_CONNECTION_STRING,
    NODE_ENV
  } = process.env;
  let knex;
  if (NODE_ENV === 'production') {
    knex = knexClient({
      client: 'mysql',
      connection: {
        user: 'root',
        password: MYSQL_ROOT_PASSWORD,
        database: MYSQL_DATABASE,
        socketPath: DB_SOCKET_CONNECTION_STRING
      }
    });
  } else {
    knex = knexClient({
      client: 'mysql',
      connection: MYSQL_CONNECTION_STRING
    });
  }

  return knex;
};

export default class KnexClient {
  private static dbConnection: knexClient;
  constructor() {
    if (!KnexClient.dbConnection) {
      KnexClient.dbConnection = createConnection();
    }
  }

  getConnection(): knexClient {
    return KnexClient.dbConnection;
  }
}
