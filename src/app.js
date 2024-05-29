import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '#routes';
import passport from '#auth';
import cookieParser from 'cookie-parser';
import config from '#config';
import { logErrors, errorHandler, ormErrorHandler } from '#middlewares';

const app = express();

const whitelist =
  config.nodeEnv === 'production'
    ? ['https://andgames.jeresc.com']
    : ['http://localhost:5173'];

const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(options));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

routes(app);

app.use(passport.initialize());

app.use(logErrors);
app.use(ormErrorHandler);
app.use(errorHandler);

export default app;
