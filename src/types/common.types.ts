export type TResultError = {
  success: false,
  error: string,
  location: string
};

export type TResultSuccess<T> = {
  success: true,
  value: T,
};

export type Result<T> = TResultSuccess<T> | TResultError;
