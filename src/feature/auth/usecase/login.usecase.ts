import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { AppDataSource } from '@config/db.config';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { LoginRequestDto } from '@feature/auth/usecase/request/login.usecase.request';
import { comparePassword } from '@core/hashing/hashing';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { createToken } from '@core/auth/JwtStrategy';
import config, { JwtInterface } from '@config/index';
import { LoginResponseDto } from '@feature/auth/dto/LoginResponseDto';
import { UserDetailsDbRepository } from '@feature/auth/repository/db/userDetails.db.repository';
import { UserCredentialDbRepository } from '@feature/auth/repository/db/userCredential.db.repository';

export default async function loginUsecase(req: Request, res: Response, next: NextFunction, queryRunner?: QueryRunner): Promise<Result<object>> {
  const connection = queryRunner?.manager || AppDataSource.manager;
  const userRepository = new UserDetailsDbRepository(connection);
  const userCredentialRepository = new UserCredentialDbRepository(connection);

  const body: LoginRequestDto = req.body;

  const userDetails = await userRepository.getIndividualUserDetails({ email: body.email });

  if (!userDetails) {
    throw new BadRequestException(`User cannot be found with ${body.email}`);
  }

  const userCredentialDetails = await userCredentialRepository.getIndividualUserCredentials({userId: userDetails?.id});

  if (!userCredentialDetails) {
    throw new BadRequestException(`User cannot be found with ${body.email}`);
  }

  const matchPassword = await comparePassword(body.password, userCredentialDetails?.password, body.email, userDetails.fullName);

  if (!matchPassword) {
    throw new BadRequestException('Incorrect Password');
  }

  const userTokenPayload = {
    email: userDetails.email,
    userId: userDetails.id,
    fullName: `${userDetails.fullName}`
  };

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(userTokenPayload);

  const responseDto: LoginResponseDto = {
    email: userDetails.email,
    fullName: `${userDetails.fullName}`,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  return Result.createSuccess(responseDto);

}


function generateAccessAndRefreshToken(payload: string | object | Buffer): {
  accessToken: string;
  refreshToken: string;
} {
  const accessToken = createToken(payload, config.accessJwt as JwtInterface, config.accessJwt.audience as string);
  const refreshToken = createToken(payload, config.refreshJwt as JwtInterface, config.refreshJwt.audience as string);

  return { accessToken, refreshToken };
}
