import { Router } from 'express';
import { tokenValidator } from '../middlewares';
import { getUserCtr, createUserCtr } from '../controllers';

const users = Router();

users.post('/users', tokenValidator, createUserCtr);
users.get('/users', tokenValidator, getUserCtr);

export { users };
