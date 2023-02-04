import PhoneData from '../data/PhoneData';
import { IUserEntity, IUserEntityData } from '../types/user.types';
import { Entity } from './Entity';

type TValidateUserResponse = Partial<{ [key in keyof IUserEntityData]: boolean }>;

class User extends Entity<IUserEntityData> implements IUserEntity {
  public validate = (): TValidateUserResponse => {
    const { id, phone } = this.data;

    return {
      id: id !== '',
      phone: new PhoneData(phone).validate(),
    };
  };

  generateAuthToken = () => `CHANGE_${this.getData().id}:${this.getData().phone}`;
}

export default User;
