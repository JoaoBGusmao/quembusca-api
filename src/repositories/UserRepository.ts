import { Result } from '../types/common.types';
import { IUserEntity, IUserRepository } from '../types/user.types';

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
      return { success: false, error: 'USER_ALREADY_EXIST', location: 'USER_REPOSITORY' };
    }
    return { success: true, value: true };
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return true;
  };
}

export default UserRepository;
