import { Result } from '../types/common.types';
import { IUserEntity } from '../types/user.types';
import ErrorMessageEnum from '../types/error-message.enum';
import ErrorLocationEnum from '../types/error-location.enum';
import { IRepository } from './Repository';

export interface IAuthData {
  id: string
  phone: string
  code: string
}

export interface IAuthRepository extends Omit<IRepository<IUserEntity, IAuthData>, 'persist'> {
  persist(entity: IUserEntity, code: string) : Promise<Result<IAuthData>>;
  findByPhone(phone: string) : Promise<Result<IAuthData>>;
}

class AuthRepository implements IAuthRepository {
  get = async (id: string) : Promise<Result<IAuthData>> => {
    console.log('get', id, this);
    return {
      success: true,
      value: {
        id: '123',
        phone: 'aa',
        code: '123',
      },
    };
  };

  findByPhone = async (phone: string) : Promise<Result<IAuthData>> => {
    console.log('find by phone', phone, this);

    return {
      success: true,
      value: {
        id: '123',
        phone: 'aa',
        code: '123',
      },
    };
  };

  persist = async (input: IUserEntity) : Promise<Result<IAuthData>> => {
    console.log(input, this);

    if (!input) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_ALREADY_EXIST,
        location: ErrorLocationEnum.USER_REPOSITORY,
      };
    }
    return { success: true, value: { id: '123', phone: '111111', code: '111111' } };
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return true;
  };
}

export default AuthRepository;
