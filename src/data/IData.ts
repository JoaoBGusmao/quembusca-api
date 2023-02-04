export interface IData<T> {
  data: T
  validate(): boolean
  get(): T
}
