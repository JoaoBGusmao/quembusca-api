import { Result } from '../types/common.types';

export interface IRepository<Entity, Data> {
  get(id: string) : Promise<Data>;
  remove(id: string) : Promise<boolean>;
  persist(entity: Entity) : Promise<Result<boolean>>;
}