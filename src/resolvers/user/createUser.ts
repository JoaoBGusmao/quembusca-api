import { NextFunction, Request, Response } from 'express';
import User from '../../entities/User';
import { IUserRepository } from '../../types/user.types';
import UserRepository from '../../repositories/UserRepository';
import { Result } from '../../types/common.types';
import ErrorMessageEnum from '../../types/error-message.enum';
import ErrorLocationEnum from '../../types/error-location.enum';

interface IReqBody {
  phone: string;
  code: string;
}

export default async (
  req: Request<any, any, IReqBody>,
  res: Response<Result<undefined>>,
  next: NextFunction,
  userRepository: IUserRepository = new UserRepository(),
): Promise<void> => {
  const { phone, code } = req.body;

  const newUser = new User({ phone });
  const newUserValidate = newUser.validate();

  if (!newUserValidate || !newUserValidate.phone) {
    res.json({
      success: false,
      error: ErrorMessageEnum.INVALID_PHONE,
      location: ErrorLocationEnum.CREATE_USER,
    });

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
