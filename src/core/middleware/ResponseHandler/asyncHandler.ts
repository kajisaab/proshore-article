import type { NextFunction, Request, Response } from 'express';
import { Result } from '@core/middleware/ResponseHandler/Result';
import AppLogger from '@core/logger';

/**
 * Async handler to wrap the API routes, allowing for async error handling and response sending.
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */

export const asyncHandler =
  (fn: (_req: Request, _res: Response, _next: NextFunction) => Promise<Result<unknown>>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = new AppLogger();
      try {
        const result = await fn(req, res, next);
        // Send the response
        const { code, message, data } = result;

        res.status(200).json({ code, message, data }); // Modify as per your response format
      } catch (error) {
        // Pass the error to the error handling middleware
        logger.error(error);
        next(error);
      }
    };
