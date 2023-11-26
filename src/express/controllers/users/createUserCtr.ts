import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { databaseResponseTimer } from '../maintenance/metrics';
import { ajv, doSomeHeavyTask } from '../../utils';
import logger from '../../../logger';

import * as createUserDtoSchema from './schemas/createUserDto.json';

// import userService from '../../../services/users/UseeService';

import { User } from '../../../databases/postgre/entities/UsersEnt';

interface CreateUserDto extends Request {
  body: Omit<User, 'id'>;
}

const validateCreateUserDto = ajv.compile(createUserDtoSchema);

export async function createUserCtr(
  req: CreateUserDto,
  res: Response,
  next: NextFunction,
) {
  try {
    if (res.locals.userId !== 'userUUID') {
      return next(createError(403, 'Not enough rights for the operation'));
    }

    if (!validateCreateUserDto(req.body)) {
      return next(
        createError(422, 'Incorrect athlete DTO structure', {
          errors: validateCreateUserDto.errors,
        }),
      );
    }

    logger.info('User was created');

    const operationTimer = databaseResponseTimer.startTimer();
    const timeTaken = await doSomeHeavyTask();
    operationTimer({ operation: 'doSomeHeavyTask', success: 'true' });

    res.json({
      status: 'success',
      message: `Heavy task completed in ${timeTaken} ms`,
    });
  } catch (e) {
    return next(e);
  }
}
