import { Request, Response } from 'express';
import createUser from './createUser';
import MockUserRepository from '../../repositories/mocks/MockUserRepository';

describe('createUser', () => {
  it('success code request', async () => {
    const req = {
      body: {
        phone: '11999999999',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res, () => {}, new MockUserRepository([]));

    expect(res.json).toHaveBeenCalledWith({ success: true, value: undefined });
  });
});
