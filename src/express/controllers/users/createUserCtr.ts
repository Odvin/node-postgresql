import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

import { ajv } from '../../utils';

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

    // const id = await userService.createUser(req.body);

    // res.json({ athlete_id });

    res.json({ res: 'Ok' });
  } catch (e) {
    return next(e);
  }
}
