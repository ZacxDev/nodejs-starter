import cors from 'cors';
import express, { Response, Request, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import HealthCheckController from 'Controllers/HealthCheckController';
import GreetingController from 'Controllers/GreetingController';
import { ValidateToken } from 'Middleware/ValidateToken';

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'HEAD']
};
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(ValidateToken);

app.get('/', (req: Request, res: Response, unusedNext: NextFunction) => {
  return HealthCheckController.index(req, res);
});

app.get('/greeting', (req: Request, res: Response, unusedNext: NextFunction) => {
  return GreetingController.greeting(req, res);
});

export default app;
