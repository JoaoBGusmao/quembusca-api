import { Request, Response } from 'express';
import createUser from './createUser';
import MockUserRepository from '../../repositories/mocks/MockUserRepository';
import ErrorMessageEnum from '../../types/error-message.enum';
import ErrorLocationEnum from '../../types/error-location.enum';
import User from '../../entities/User';
import MockAuthRepository from '../../repositories/mocks/MockAuthRepository';

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

    await createUser(req, res, () => {}, new MockUserRepository());

    expect(res.json).toHaveBeenCalledWith({ success: true, value: undefined });
  });

  it('should not proceed with an invalid number', async () => {
    const req = {
      body: {
        phone: 'invalid phone',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await createUser(req, res, () => {}, new MockUserRepository());

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: ErrorMessageEnum.INVALID_PHONE,
      location: ErrorLocationEnum.CREATE_USER,
    });
  });

  it('should create a new temp account when account doesn\'t exist yet', async () => {
    const req = {
      body: {
        phone: '11999999999',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const userRepository = new MockUserRepository();
    const authRepository = new MockAuthRepository();

    authRepository.persist(new User({
      id: '123',
      phone: '22999999999',
    }), '111111');

    await createUser(
      req,
      res,
      () => {},
      userRepository,
      authRepository,
      () => '555555',
    );

    const allAuthData = authRepository.getAllData();
    expect(allAuthData.length).toBe(2);
    expect(allAuthData[1].phone).toBe(req.body.phone);
    expect(allAuthData[1].code).toBe('555555');

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      value: undefined,
    });
  });

  it('should renew expiration and generate a new code', () => {
    // TODO:
    expect(true).toBe(true);
  });

  it('should not authenticate a wrong code attempt', async () => {
    const req = {
      body: {
        phone: '11999999999',
        code: '111111',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const userRepository = new MockUserRepository();
    const authRepository = new MockAuthRepository();

    authRepository.persist(new User({
      id: '123',
      phone: '11999999999',
    }), '123123');

    await createUser(
      req,
      res,
      () => {},
      userRepository,
      authRepository,
    );

    const allAuthData = authRepository.getAllData();
    expect(allAuthData.length).toBe(1);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: ErrorMessageEnum.AUTH_WRONG_CODE,
      location: ErrorLocationEnum.CREATE_USER,
    });
  });

  it('should not authenticate code attempt without a registered auth attempt', async () => {
    const req = {
      body: {
        phone: '11999999999',
        code: '111111',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const userRepository = new MockUserRepository();
    const authRepository = new MockAuthRepository();

    await createUser(
      req,
      res,
      () => {},
      userRepository,
      authRepository,
    );

    const allAuthData = authRepository.getAllData();
    expect(allAuthData.length).toBe(0);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: ErrorMessageEnum.AUTH_CODE_EXPIRED,
      location: ErrorLocationEnum.CREATE_USER,
    });
  });

  it('should create new account and return a token when confirmation code is right and account doesnt exist', async () => {
    const req = {
      body: {
        phone: '11999999999',
        code: '123123',
      },
    } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const userRepository = new MockUserRepository();
    const authRepository = new MockAuthRepository();

    authRepository.persist(new User({
      id: '123',
      phone: '11999999999',
    }), '123123');

    await createUser(
      req,
      res,
      () => {},
      userRepository,
      authRepository,
    );

    const allAuthData = authRepository.getAllData();
    expect(allAuthData.length).toBe(0);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      value: {
        token: expect.any(String),
      },
    });
  });
});
