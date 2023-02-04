import { Result, TResultSuccess } from '../types/common.types';
import { IUserEntity, IUserEntityData, IUserRepository } from '../types/user.types';
import ErrorMessageEnum from '../types/error-message.enum';
import ErrorLocationEnum from '../types/error-location.enum';

class UserRepository implements IUserRepository {
  get = async (id: string) : Promise<Result<IUserEntityData>> => {
    console.log('get', id, this);
    return {
      success: true,
      value: {
        id: '123',
        phone: 'aa',
      },
    };
  };

  findByPhone = async (phone: string): Promise<Result<IUserEntityData>> => {
    console.log('get', phone, this);
    return { success: true, value: { id: '123', phone: 'aa' } };
  };

  persist = async (input: IUserEntity) : Promise<Result<IUserEntityData>> => {
    console.log(input, this);

    if (!input) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_ALREADY_EXIST,
        location: ErrorLocationEnum.USER_REPOSITORY,
      };
    }
    return { success: true, value: { id: '123', phone: '1111111' } };
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return { success: true, value: true } as TResultSuccess<boolean>;
  };
}

export default UserRepository;
