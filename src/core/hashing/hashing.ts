import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import AppLogger from '@core/logger';

function deriveSalt(userIdentifier: string, userName: string): string {
  const hmac = crypto.createHmac('sha512', userIdentifier);

  const data = hmac.update(userName);

  return data.digest('hex');
}

export async function hashPassword(
  password: string,
  userIdentifier: string,
  fullName: string
): Promise<{hashedPassword: string, salt: string}> {
  const salt = deriveSalt(userIdentifier, fullName);
  const saltedPassword = password + salt;
  const hashedPassword = await bcrypt.hash(saltedPassword, 12);

  return {hashedPassword, salt};
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
  userIdentifier: string,
  userName: string
): Promise<boolean> {
  const logger = new AppLogger();
  const salt = deriveSalt(userIdentifier, userName);
  const saltedPassword = password + salt;
  try {
    return await bcrypt.compare(saltedPassword, hashedPassword);
  } catch (e) {
    const error = e as Error;
    logger.error(error);
    return false;
  }
}
