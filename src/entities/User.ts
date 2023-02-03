import PhoneData from '../data/PhoneData';
import { IUserEntity, IUserEntityData } from '../types/user.types';
import { Entity } from './Entitiy';

class User extends Entity<IUserEntityData> implements IUserEntity {
  public validate = () :
  Partial<{ [key in keyof IUserEntityData]: boolean }> => {
    if (!this.data) {
      return {};
    }

    const {
      id,
      phone,
    } = this.data;

    return {
      id: id !== '',
      phone: new PhoneData(phone).validate(),
    };
  };
}

export default User;
