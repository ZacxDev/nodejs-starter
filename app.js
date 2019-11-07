import useApolloMiddleware from './graphql';

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function(req, res, next) {
  res.json({
    health: 'healthy',
  });
});

useApolloMiddleware(app);


export default app;
