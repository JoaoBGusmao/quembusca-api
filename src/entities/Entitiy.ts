import { v4 as uuid } from 'uuid';

export interface IEntityData {
  id: string;
}

export interface IEntity<T extends IEntityData> {
  data: T | undefined;

  getData: () => T;
  validate: () => Partial<{ [key in keyof T]: boolean }>
}

export abstract class Entity<T extends IEntityData> implements IEntity<T> {
  data: T | undefined;

  public constructor(
    input: Partial<T>,
  ) {
    this.data = {
      id: input.id ?? uuid(),
      ...input,
    } as T;
  }

  public getData = () : T => this.data as T;

  public validate = () => (
    Object.keys(this.getData())
      .reduce((acc, current) => ({
        ...acc, [current]: true,
      }), {}) as Partial<{ [key in keyof T]: boolean }>
  );
}
