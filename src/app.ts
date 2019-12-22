import useApolloMiddleware from './graphql';
import cors from 'cors';

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'HEAD']
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/', function(req: object, res: {json: Function}, next: Function) {
  res.json({
    api: process.env.APP_NAME,
    health: 'healthy'
  });
});

useApolloMiddleware(app);


export default app;
