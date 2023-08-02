import { Request, Response, NextFunction } from 'express';

import userService from '../../../services/users/UserService';

export async function getAthleteCtr(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = 'e6015e15-3e66-4536-9fdf-02facbde9df3';

    const user = await userService.getUser(id);

    res.json(user);
  } catch (e) {
    return next(e);
  }
}
