import { Result } from '../types/common.types';
import { IUserEntity, IUserRepository } from '../types/user.types';
import ErrorMessageEnum from '../types/error-message.enum';
import ErrorLocationEnum from '../types/error-location.enum';

class UserRepository implements IUserRepository {
  get = async (id: string) => {
    console.log('get', id, this);
    return {
      id: '123',
      phone: 'aa',
    };
  };

  persist = async (input: IUserEntity) : Promise<Result<boolean>> => {
    console.log(input, this);

    if (!input) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_ALREADY_EXIST,
        location: ErrorLocationEnum.USER_REPOSITORY,
      };
    }
    return { success: true, value: true };
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return true;
  };
}

export default UserRepository;
