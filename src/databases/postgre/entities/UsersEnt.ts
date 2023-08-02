import Entity from './Entity';
import logger from '../../../logger';

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

export class Users extends Entity<User> {
  constructor(entityName: string, schemaName: string) {
    super(entityName, schemaName);
  }

  async initiate(user: Omit<User, 'id'>) {
    logger.debug(`Users :: initiate  ${user}`);

    return { id: 'e6015e15-3e66-4536-9fdf-02facbde9df3' };
  }

  async getById(id: User['id']) {
    logger.debug(`Users :: getById ${id}`);

    return {
      id: 'e6015e15-3e66-4536-9fdf-02facbde9df3',
      name: 'Jon',
      surname: 'Dou',
    };
  }
}

export default new Users('users', 'master');
