import type { Response, Request, NextFunction } from 'express';
import { CustomError, type IResponseError } from './CustomError';
import AppLogger from '@core/logger';

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  const logger = new AppLogger();
  if(err) {
    console.log(JSON.stringify(err));
    logger.error(JSON.stringify(err));
    if (!(err instanceof CustomError)) {
      const defaultErrorResponse: IResponseError = {
        code: '-1',
        message: 'Internal Server Error',
        data: { message: 'Server error, please try again later' }
      };
      res.status(500).json(defaultErrorResponse);
      return;
    }

    const customError = err as IResponseError;
    const response: IResponseError = {
      code: customError.code,
      message: customError.errorTitle ?? 'Error',
      data: { message: customError.data.message }
    };
    res.status(customError?.status ?? 400).json(response);
  }
}

export default errorHandler;
