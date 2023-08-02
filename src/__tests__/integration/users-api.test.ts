import request from 'supertest';

import { app } from '../../express';

describe('Admins :: API', () => {
  test('Get user by id', async () => {
    const testToken = 'foo';

    const res = await request(app)
      .get(`/users?id=e6015e15-3e66-4536-9fdf-02facbde9df3`)
      .set('Authorization', `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ res: 'Ok' });
  });
});
