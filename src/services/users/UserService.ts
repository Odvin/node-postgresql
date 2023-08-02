import users, { User, Users } from '../../databases/postgre/entities/UsersEnt';

export class UserService {
  constructor(public users: Users) {}

  async createUser(user: Omit<User, 'id'>) {
    const { id } = await this.users.initiate(user);
    return { id };
  }

  async getUser(id: User['id']) {
    return this.users.getById(id);
  }
}

export default new UserService(users);
