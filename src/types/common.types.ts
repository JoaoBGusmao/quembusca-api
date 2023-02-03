export type ResultError = {
  success: false,
  error: string,
  location: string
};

export type ResultSuccess<T> = {
  success: true,
  value: T,
};

export type Result<T> = ResultSuccess<T> | ResultError;
