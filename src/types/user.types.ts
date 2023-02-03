import { IEntity, IEntityData } from '../entities/Entitiy';
import { IRepository } from '../repositories/Repository';

export interface IUserEntityData extends IEntityData {
  phone: string;
}

export interface IUserRepository extends IRepository<IUserEntity, IUserEntityData> {

}

export interface IUserEntity extends IEntity<IUserEntityData> {

}