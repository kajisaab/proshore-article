import { UnauthorizedError } from '@core/middleware/errorHandler/unauthorizedError';
import { createToken, decodeToken, verifyToken } from './JwtStrategy';
import config from '@config/index';
import { type JwtTokenUserDetail } from 'utils/jwtConfigInterface.interface';
import { type JsonWebTokenError, type JwtPayload } from 'jsonwebtoken';
import AppLogger from '@core/logger';

export async function parseToken(token: string, tokenType: string): Promise<JwtTokenUserDetail | JwtPayload> {
  const logger = new AppLogger();
  if (!token) {
    throw new UnauthorizedError('Sorry token not provided');
  }
  try {
    const decodedToken: JwtPayload = decodeToken(token);

    const configKey = tokenType + 'Jwt';
    await verifyToken(token, config[configKey as 'accessJwt' | 'refreshJwt']);

    return decodedToken;
  } catch (err) {
    const error = err as JsonWebTokenError;
    logger.error(error);
    throw new UnauthorizedError('Token expired or invalid');
  }
}

export async function updateToken(token: string, tokenType: string): Promise<string> {
  const logger = new AppLogger();
  if (token === '' || token.length === 0) {
    throw new UnauthorizedError('Sorry, Token not provided');
  }

  try {
    const decodedToken: JwtPayload = decodeToken(token);
    const configKey = tokenType + 'Jwt';

    if (decodeToken === null || decodedToken.iss !== config[configKey as 'accessJwt' | 'refreshJwt'].issuer) {
      throw new UnauthorizedError('Sorry, invalid token');
    }

    const payload: JwtTokenUserDetail = {
      userId: decodedToken?.userId ?? '',
      fullName: decodedToken?.firstName ?? '',
      refreshToken: decodedToken?.refreshToken ?? ''
    };

    await verifyToken(token, config[configKey as 'accessJwt' | 'refreshJwt']);

    return createToken(payload, config[configKey as 'accessJwt' | 'refreshJwt'], decodedToken.aud as string);
  } catch (err) {
    const error = err as JsonWebTokenError;
    logger.error(error);
    throw new UnauthorizedError('Token expired or invalid');
  }
}
