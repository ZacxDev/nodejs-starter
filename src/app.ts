import useApolloMiddleware from './graphql';
import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

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

app.get('/', (req: Request, res: Response, unusedNext: NextFunction) => {
  res.json({
    api: process.env.APP_NAME,
    health: 'healthy'
  });
});

useApolloMiddleware(app);

export default app;
