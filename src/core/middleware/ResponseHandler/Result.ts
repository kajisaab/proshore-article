export class Result<T> {
  code: string;
  message: string;
  data: T;
  errors: Error[];

  constructor(code: string, message: string, data: T, error: Error[]) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.errors = error;
  }

  static createSuccess(data: object): Result<object> {
    return new Result('0', 'SUCCESS', data, []);
  }
}
