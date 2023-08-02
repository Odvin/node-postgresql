import userService from '../../services/users/UserService';

userService.users.initiate = jest.fn(() =>
  Promise.resolve({ id: 'e6015e15-3e66-4536-9fdf-02facbde9df3' }),
);

describe('Domains::Users', () => {
  it('createUser', async () => {
    const mock = { email: 'e@d.com', name: 'Jon', surname: 'Dou' };
    const res = await userService.createUser(mock);

    expect(res).toHaveProperty('id');

    const userId = { id: 'e6015e15-3e66-4536-9fdf-02facbde9df3' };

    expect(res).toEqual(userId);
  });
});
