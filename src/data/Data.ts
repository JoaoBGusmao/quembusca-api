export interface Data<T> {
  data: T
  validate(): boolean
  get(): T
}
