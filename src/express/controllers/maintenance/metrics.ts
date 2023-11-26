import { Request, Response, NextFunction } from 'express';
import promClient from 'prom-client';

const register = new promClient.Registry();

register.setDefaultLabels({
  app: 'node-postgres',
});

const collectDefaultMetrics = promClient.collectDefaultMetrics;

collectDefaultMetrics();

export const httpRequestTimer = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  // buckets for response time from 0.1ms to 1s
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
});

export const totalReqCounter = new promClient.Counter({
  name: 'total_req',
  help: 'Tells total requests',
});

export const databaseResponseTimer = new promClient.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'Database response time in seconds',
  labelNames: ['operation', 'success'],
});

export async function metrics(req: Request, res: Response, next: NextFunction) {
  try {
    res.setHeader('Content-Type', promClient.register.contentType);
    res.send(await promClient.register.metrics());
  } catch (e) {
    return next(e);
  }
}
