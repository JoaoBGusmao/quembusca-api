import { Result } from '../types/common.types';

export interface IRepository<Entity, Data> {
  get(id: string) : Promise<Result<Data>>;
  remove(id: string) : Promise<Result<boolean>>;
  persist(entity: Entity) : Promise<Result<Data>>;
}
