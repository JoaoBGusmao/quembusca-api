import ErrorLocationEnum from './error-location.enum';
import ErrorMessageEnum from './error-message.enum';

export type TResultError = {
  success: false,
  error: ErrorMessageEnum,
  location: ErrorLocationEnum
};

export type TResultSuccess<T> = {
  success: true,
  value: T,
};

export type Result<T> = TResultSuccess<T> | TResultError;
