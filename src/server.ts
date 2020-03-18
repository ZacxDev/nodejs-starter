/**
 * Module dependencies.
 */

require('dotenv').config();
import app from './app';
import http from 'http';

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: number|string): number|string => {
  if (typeof val === 'string') {
    const port = parseInt(val, 10);
    return port;
  } else if (val >= 0) {
    return val;
  }

  throw new Error('Failed To Normalize Port');
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = (): void => {
  const addr = server.address();
  if (addr) {
    const bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;
    console.log('Listening on ' + bind);
  }
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort('4000');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (error: any): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
  case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
  default:
    throw error;
  }
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
