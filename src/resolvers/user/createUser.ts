import { NextFunction, Request, Response } from 'express';
import User from '../../entities/User';
import { IUserRepository } from '../../types/user.types';
import UserRepository from '../../repositories/UserRepository';
import { Result } from '../../types/common.types';

export default async (
  req: Request,
  res: Response<Result<undefined>>,
  next: NextFunction,
  userRepository: IUserRepository = new UserRepository(),
): Promise<void> => {
  const { phone } = <{ phone: string }>req.body;
  const { code } = req.body;

  const newUser = new User({ phone });
  const newUserValidate = newUser.validate();

  if (!newUserValidate || !newUserValidate.phone) {
    res.json({ success: false, error: 'INVALID_PHONE', location: 'CREATE_USER' });

    return;
  }

  if (code) {
    console.log('code provided');
  }

  const persistResponse = await userRepository.persist(newUser);
  const { success } = persistResponse;

  if (!success) {
    const { error, location } = persistResponse;
    res.json({ success: false, error, location });

    return;
  }

  res.json({ success: true, value: undefined });
};