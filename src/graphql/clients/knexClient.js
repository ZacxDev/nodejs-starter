const {
  MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE,
  DB_SOCKET_CONNECTION_STRING,
  MYSQL_CONNECTION_STRING,
  NODE_ENV
} = process.env;
let connectionParams = MYSQL_CONNECTION_STRING;

if (NODE_ENV === 'production') {
  connectionParams = {
    user: 'root',
    password: MYSQL_ROOT_PASSWORD,
    database: MYSQL_DATABASE,
    socketPath: DB_SOCKET_CONNECTION_STRING
  };
}

const knex = require('knex')({
  client: 'mysql',
  connection: connectionParams
});

export default knex;
