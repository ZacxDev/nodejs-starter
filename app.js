import { ApolloServer, gql } from 'apollo-server-express';

const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

import indexRouter from './routes/index';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

const apolloServer = new ApolloServer({
  typeDefs: gql`${schema}`,
  resolvers: rootResolver,
  context: async ({ req }) => {
    if (req) {
      let loggedInUser;
      if (req.me) {
        loggedInUser = req.me;
      } else {
        const { sessionKey } = req.cookies;
        if (sessionKey) {
          const rawMoment = moment().format('YYYY-MM-DD HH:mm:ss');
          loggedInUser = await sails.hooks.knex('user')
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
          session
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
    'x-csrf-token'
  ]
};

apolloServer.applyMiddleware({
  path: '/graphql',
  app,
  cors
});

export default app;
