import { IEntity, IEntityData } from '../entities/Entity';
import { IRepository } from '../repositories/Repository';
import { Result } from './common.types';

export interface IUserEntityData extends IEntityData {
  phone: string;
}

export interface IUserRepository extends IRepository<IUserEntity, IUserEntityData> {
  findByPhone(phone: string) : Promise<Result<IUserEntityData>>;
}

export interface IUserEntity extends IEntity<IUserEntityData> {

}
