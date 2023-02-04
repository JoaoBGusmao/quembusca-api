import { NextFunction, Request, Response } from 'express';
import User from '../../entities/User';
import { IUserRepository } from '../../types/user.types';
import UserRepository from '../../repositories/UserRepository';
import { Result, TResultError } from '../../types/common.types';
import ErrorMessageEnum from '../../types/error-message.enum';
import ErrorLocationEnum from '../../types/error-location.enum';
import AuthRepository, { IAuthRepository } from '../../repositories/AuthRepository';
import randomCodeGenerator from '../../helpers/randomCodeGenerator';

interface IReqBody {
  phone: string;
  code: string;
}

interface ISuccessfulLogin {
  token: string
}

const getError = (error: ErrorMessageEnum, location: ErrorLocationEnum) : TResultError => ({
  success: false,
  error,
  location,
});

export default async (
  req: Request<any, any, IReqBody>,
  res: Response<Result<ISuccessfulLogin | undefined>>,
  next: NextFunction,
  userRepository: IUserRepository = new UserRepository(),
  authRepository: IAuthRepository = new AuthRepository(),
  codeGenerator = randomCodeGenerator,
): Promise<void> => {
  const { phone, code } = req.body;

  const user = new User({ phone });
  const userData = user.getData();
  const newUserValidate = user.validate();

  if (!newUserValidate || !newUserValidate.phone) {
    res.json(getError(ErrorMessageEnum.INVALID_PHONE, ErrorLocationEnum.CREATE_USER));
    return;
  }

  const userWithThisPhone = await userRepository.findByPhone(userData.phone);

  const expectedAuthErrors = [
    ErrorMessageEnum.USER_NOT_FOUND,
  ];

  if (!userWithThisPhone.success && !expectedAuthErrors.includes(userWithThisPhone.error)) {
    res.json(getError(userWithThisPhone.error, userWithThisPhone.location));
    return;
  }

  if (code) {
    const authUser = await authRepository.findByPhone(userData.phone);

    if (!authUser.success) {
      res.json(getError(ErrorMessageEnum.AUTH_CODE_EXPIRED, ErrorLocationEnum.CREATE_USER));
      return;
    }

    if (authUser.value.code !== code) {
      res.json(getError(ErrorMessageEnum.AUTH_WRONG_CODE, ErrorLocationEnum.CREATE_USER));
      return;
    }

    const userToInsert = new User({
      id: userWithThisPhone.success && userWithThisPhone.value.id ? userWithThisPhone.value.id : '',
      phone: userData.phone,
    });

    await authRepository.remove(authUser.value.id);
    const insertedUser = await userRepository.persist(userToInsert);

    if (!insertedUser.success) {
      res.json({
        success: false,
        error: insertedUser.error,
        location: insertedUser.location,
      });

      return;
    }

    const insertedInstance = new User(insertedUser.value);

    res.json({
      success: true,
      value: {
        token: insertedInstance.generateAuthToken(),
      },
    });

    return;
  }

  if (!userWithThisPhone.success && userWithThisPhone.error === ErrorMessageEnum.USER_NOT_FOUND) {
    const OTPCode = codeGenerator();

    authRepository.persist(user, OTPCode);

    res.json({ success: true, value: undefined });
    return;
  }

  res.json(getError(ErrorMessageEnum.UNKNOWN, ErrorLocationEnum.CREATE_USER));
};
