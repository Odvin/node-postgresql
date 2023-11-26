import express, { Express, Request, Response } from 'express';

import cors from 'cors';
import morgan from 'morgan';
import responseTime from 'response-time';

import logger from '../logger';

import { maintenance, users, recipes } from './routers';

import { unhandled, errors } from './controllers';

import {
  httpRequestTimer,
  totalReqCounter,
} from './controllers/maintenance/metrics';

import {
  port,
  serviceName,
  routerLog,
  corsUrl,
  parserOptions,
} from '../config';

const app: Express = express();

if (routerLog.active) app.use(morgan(routerLog.format));

app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

app.use(express.json(parserOptions.json));
app.use(express.urlencoded(parserOptions.urlencoded));
app.use(
  responseTime((req: Request, res: Response, time: number) => {
    totalReqCounter.inc();
    httpRequestTimer
      .labels(req.method, req.url, res.statusCode.toString())
      .observe(time);
  }),
);

// Routing
app.use(recipes);
app.use(users);

// Service healthcheck
app.use(maintenance);

// Errors handler
app.use(unhandled);
app.use(errors);

function serviceRunner() {
  return app
    .listen(port, () =>
      logger.info(`🚀 :: ${serviceName} is running on port :: ${port}`),
    )
    .on('error', logger.error);
}

export { app, serviceRunner };
