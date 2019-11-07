require('dotenv').config();

const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  DB_SOCKET_CONNECTION_STRING,
  MYSQL_CONNECTION_STRING
} = process.env;

let connectionParams = MYSQL_CONNECTION_STRING;

if (process.env.NODE_ENV === 'production') {
  connectionParams = {
    user: 'root',
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    socketPath: DB_SOCKET_CONNECTION_STRING
  };
}

module.exports = {
  client: 'mysql',
  connection: connectionParams,
  migrations: {
    tableName: 'myAppMigrations',
    directory: './migrations'
  }
};
