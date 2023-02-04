import { v4 as uuid } from 'uuid';
import { IUserEntity } from '../../types/user.types';
import { Result, TResultSuccess } from '../../types/common.types';
import ErrorMessageEnum from '../../types/error-message.enum';
import ErrorLocationEnum from '../../types/error-location.enum';
import { IAuthData, IAuthRepository } from '../AuthRepository';
import { IAuth } from '../../services/database/models/auth';

class MockAuthRepository implements IAuthRepository {
  private data: IAuth[] = [];

  get = async (id: string) : Promise<Result<IAuthData>> => {
    if (id !== '') {
      return {
        success: false,
        error: ErrorMessageEnum.USER_NOT_FOUND,
        location: ErrorLocationEnum.AUTH_REPOSITORY,
      };
    }

    console.log('get', id, this);
    return {
      success: true,
      value: {
        id: '123',
        phone: 'aa',
        code: '123123',
      },
    };
  };

  findByPhone = async (phone: string) : Promise<Result<IAuthData>> => {
    const userFound = this.data.find((storedUser) => storedUser.phone === phone);

    if (phone === '' || !userFound) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_NOT_FOUND,
        location: ErrorLocationEnum.AUTH_REPOSITORY,
      };
    }

    return {
      success: true,
      value: {
        id: userFound.id,
        phone: userFound.phone,
        code: userFound.code,
      },
    };
  };

  persist = async (input: IUserEntity, code: string) => {
    const inputData = input.getData();
    const newData = {
      id: uuid(),
      phone: inputData.phone,
      code,
    } as IAuth;

    this.data = [
      ...this.data,
      newData,
    ];

    return { success: true, value: newData as IAuthData } as TResultSuccess<IAuthData>;
  };

  remove = async (id: string) => {
    console.log('removing', id);

    this.data = this.data.filter((user) => user.id !== id);

    return true;
  };

  getAllData = (): IAuth[] => this.data;
}

export default MockAuthRepository;
