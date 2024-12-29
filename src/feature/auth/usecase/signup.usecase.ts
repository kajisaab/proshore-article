import { Request, Response, NextFunction } from 'express';
import { QueryRunner } from 'typeorm';
import { Result } from '@core/middleware/ResponseHandler/Result';
import { SignupResponse } from '@feature/auth/usecase/response/signup.usecase.response';
import { AppDataSource } from '@config/db.config';
import { SignupRequestDto } from '@feature/auth/usecase/request/signup.usecase.request';
import { UserDetails } from '@feature/auth/entity/UserDetails.entity';
import { BadRequestException } from '@core/middleware/errorHandler/BadRequestException';
import { hashPassword } from '@core/hashing/hashing';
import generateId from '@common/id-generator';
import { UserCredential } from '@feature/auth/entity/UserCredential.entity';
import { UserDetailsDbRepository } from '@feature/auth/repository/db/userDetails.db.repository';
import { UserCredentialDbRepository } from '@feature/auth/repository/db/userCredential.db.repository';

async function signupUsecase(req: Request, res: Response, next: NextFunction, queryRunner?: QueryRunner): Promise<Result<object>> {
  const connection = queryRunner?.manager || AppDataSource.manager;

  const requestBody: SignupRequestDto = req.body || SignupResponse;

  // Use the queryRunner's manager if provided
  const userRepository = new UserDetailsDbRepository(connection);

  const userCredentialRepository = new UserCredentialDbRepository(connection);

  const existingUserDetails = await userRepository.getIndividualUserDetails({ email: requestBody.email });

  if (existingUserDetails) {
    throw new BadRequestException(`User with the ${requestBody.email} already exists.`);
  }

  const hashedPassword = await hashPassword(requestBody.password, requestBody.email, `${requestBody.firstName} ${requestBody.lastName}`);

  const userId = generateId('4');

  const userCredentialId = generateId('4');

  const userCredential = new UserCredential();

  userCredential.id = userCredentialId;
  userCredential.userId = userId;
  userCredential.password = hashedPassword.hashedPassword;
  userCredential.loginAttempts = 0;
  userCredential.generatedSalt = hashedPassword.salt;


  const userDetails = new UserDetails();

  userDetails.id = userId;
  userDetails.fullName = `${requestBody.firstName} ${requestBody.lastName}`;
  userDetails.email = requestBody.email;
  userDetails.blocked = false;
  userDetails.active = true;

  await userCredentialRepository.save(userCredential);

  await userRepository.save(userDetails);

  const response = new SignupResponse('Successfully created user');
  return Result.createSuccess(response);
}

export default signupUsecase;
