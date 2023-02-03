import { IUserEntity, IUserRepository } from '../../types/user.types';
import { IUser } from '../../services/database/models/user';
import { TResultSuccess } from '../../types/common.types';

class MockUserRepository implements IUserRepository {
  private data : IUser[];

  constructor(preloaded: IUser[]) {
    this.data = preloaded;
  }

  get = async (id: string) => {
    console.log('get', id, this);
    return {
      id: '123',
      phone: 'aa',
    };
  };

  persist = async (input: IUserEntity) => {
    console.log('persist', input, this);
    return { success: true, value: true } as TResultSuccess<boolean>;
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return true;
  };
}

export default MockUserRepository;
