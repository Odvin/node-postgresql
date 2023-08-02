import { Request, Response, NextFunction } from 'express';
import Postgres from '../../../databases/postgre/index';

export async function readiness(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const postgreConnection = await Postgres.isConnected();

    if (postgreConnection) {
      return res.sendStatus(200);
    }

    return res.sendStatus(503);
  } catch (e) {
    return next(e);
  }
}
