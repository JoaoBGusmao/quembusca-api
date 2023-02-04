import { v4 as uuid } from 'uuid';
import { IUserEntityData, IUserEntity, IUserRepository } from '../../types/user.types';
import { IUser } from '../../services/database/models/user';
import { Result, TResultSuccess } from '../../types/common.types';
import ErrorMessageEnum from '../../types/error-message.enum';
import ErrorLocationEnum from '../../types/error-location.enum';

class MockUserRepository implements IUserRepository {
  private data : IUser[] = [];

  get = async (id: string) : Promise<Result<IUserEntityData>> => {
    const userFound = this.data.find((storedUser) => storedUser.id === id);

    if (id !== '' || !userFound) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_NOT_FOUND,
        location: ErrorLocationEnum.USER_REPOSITORY,
      };
    }

    return {
      success: true,
      value: {
        id: userFound.id,
        phone: userFound.phone,
      },
    };
  };

  findByPhone = async (phone: string) : Promise<Result<IUserEntityData>> => {
    const userFound = this.data.find((storedUser) => storedUser.id === phone);

    if (phone === '' || !userFound) {
      return {
        success: false,
        error: ErrorMessageEnum.USER_NOT_FOUND,
        location: ErrorLocationEnum.USER_REPOSITORY,
      };
    }

    return {
      success: true,
      value: {
        id: userFound.id,
        phone: userFound.phone,
      },
    };
  };

  persist = async (input: IUserEntity) => {
    const inputData = input.getData();

    const id = inputData.id ?? uuid();
    const newData = {
      id,
      phone: inputData.phone,
    } as IUser;

    this.data = [
      ...this.data,
      newData,
    ];

    return {
      success: true,
      value: newData,
    } as TResultSuccess<IUserEntityData>;
  };

  remove = async (id: string) => {
    console.log('delete', id, this);
    return true;
  };
}

export default MockUserRepository;
