import { Request, Response, NextFunction } from 'express';

// import userService from '../../../services/users/UserService';

export async function getUserCtr(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // const user = await userService.getUser(id);

    // res.json(athlete);
    res.json({ res: 'Ok' });
  } catch (e) {
    return next(e);
  }
}
