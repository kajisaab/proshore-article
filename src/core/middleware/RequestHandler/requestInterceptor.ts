import { PublicRoutes } from '@common/publicRoutes';
import { parseToken } from '@core/auth/authToken.strategy';
import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errorHandler/unauthorizedError';
import { type JwtPayload } from 'jsonwebtoken';
import { AppDataSource } from '@config/db.config';
import { UserDetailsDbRepository } from '@feature/auth/repository/db/userDetails.db.repository';
import { UserDetails } from '@feature/auth/entity/UserDetails.entity';
import RequestContext from '@core/middleware/RequestHandler/RequestContext';

function requestInterceptor(req: Request, res: Response, next: NextFunction): void {
  const inputs = [req.params, req.query, req.body];
  const connection = AppDataSource.manager;
  const userDetailsRepository = new UserDetailsDbRepository(connection);

  for (const input of inputs) {
    for (const key in input) {
      const value = input[key];
      if (typeof value === 'string' || value instanceof String) {
        input[key] = value.trim();
      }
    }
  }

  const isExcludedRoute = PublicRoutes.some((route: string) => req.originalUrl.includes(route));

  if (isExcludedRoute) {
    next();
    return;
  }

  // here validate the api for the token;
  const token: string = req.headers['x-xsrf-token'] as string;

  if (token === null || token === '' || token === undefined) {
    throw new UnauthorizedError('Token not provided');
  }

  parseToken(token, 'access')
    .then(async (parsedAccessToken: JwtPayload) => {
      if (parsedAccessToken?.exp  === null || parsedAccessToken?.exp === undefined) {
        throw new UnauthorizedError('Cannot read the token');
      }

      // Get the current timestamp (in seconds)
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Compare the current timestamp with the expiration timestamp
      if (currentTimestamp >= parsedAccessToken?.exp) {
        throw new UnauthorizedError('Token invalid or expired');
      }

      // Check if the user exists or not with the userId inside the token
      const userDetails: UserDetails | null = await userDetailsRepository.getIndividualUserDetails(parsedAccessToken?.userId);

      if(!userDetails){
        throw new UnauthorizedError('Invalid token');
      }

      RequestContext.setUser(userDetails);
      next();
    })
    .catch((err) => {
      next(err);
    });
}

export default requestInterceptor;
