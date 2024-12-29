import { AppDataSource } from '@config/db.config';
import type { NextFunction, Request, Response } from 'express';
import { QueryRunner } from 'typeorm';
import loginUsecase from '@feature/auth/usecase/login.usecase';
import { SignupRequestDto } from '@feature/auth/usecase/request/signup.usecase.request';
import AppLogger from '@core/logger';
import { SignupResponse } from '@feature/auth/usecase/response/signup.usecase.response';
import { Result } from '@core/middleware/ResponseHandler/Result';
import signupUsecase from '@feature/auth/usecase/signup.usecase';
import { LoginResponseDto } from '@feature/auth/dto/LoginResponseDto';
import { LoginResponse } from '@feature/auth/usecase/response/login.usecase.response';


describe('Login the User', () => {
  let signupReq: Partial<Request>;
  let loginReq: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let sendStub: jest.Mock;
  let statusStub: jest.Mock;
  let loggerStub: any;
  let queryRunner: QueryRunner;

  // Mock the generateAccessAndRefreshToken function .
  const mockGenerateAccessAndRefreshToken = jest.fn(() => ({
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken'
  }));

  beforeAll(async () => {
    await AppDataSource.initialize();

    // Start a transaction for the test.
    queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    (loginUsecase as any).generateAccessAndRefreshToken = mockGenerateAccessAndRefreshToken;
  });

  beforeEach(async () => {
    signupReq = {
      body: {
        firstName: 'Aman',
        lastName: 'Khadka',
        password: 'Test@123',
        email: 'amankhadka101@gmail.com',
      } as SignupRequestDto
    };

    loginReq = {
      body: {
        email: 'amankhadka101@gmail.com',
        password: 'Test@123'
      }
    };

    sendStub = jest.fn((x) => x);
    statusStub = jest.fn((x) => x);
    res = {
      status: statusStub,
      json: sendStub
    };

    next = jest.fn();

    // Mock the AppLogger
    loggerStub = jest.spyOn(AppLogger.prototype, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should signup the user', async () => {
    const expectedResponse = new SignupResponse('Successfully created user');
    const result = Result.createSuccess(expectedResponse);

    jest.spyOn(Result, 'createSuccess').mockReturnValue(result);

    const signupUsecaseResponse = await signupUsecase(signupReq as Request, res as Response, next as NextFunction, queryRunner);

    expect(signupUsecaseResponse).toEqual(result);
  });

  it('should login the user', async () => {
    const loginResponse: LoginResponseDto = {
      email: 'amankhadka101@gmail.com',
      fullName: 'Aman Khadka',
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken'
    };
    const expectedResponse = new LoginResponse(loginResponse);

    const result = Result.createSuccess(expectedResponse);

    jest.spyOn(Result, 'createSuccess').mockReturnValue(result);

    const loginUsecaseResponse = await loginUsecase(loginReq as Request, res as Response, next as NextFunction, queryRunner);

    expect(loginUsecaseResponse).toEqual(result);
  });

  it('should throw an error saying user not found', async () => {
    loginReq = {
      body: {
        email: 'abc@gmail.com',
        password: '1123123'
      }
    };
    await expect(loginUsecase(loginReq as Request, res as Response, next as NextFunction, queryRunner)).rejects.toThrow(`User cannot be found with ${loginReq.body.email}`);
  });

  it('should throw an error saying password does not match', async () => {
    loginReq = {
      body: {
        email: 'amankhadka101@gmail.com',
        password: '12312'
      }
    };
    await expect(loginUsecase(loginReq as Request, res as Response, next as NextFunction, queryRunner)).rejects.toThrow('Incorrect Password');
  });

  afterAll(async () => {
    // Roll back the transaction after all test to keep database clean.
    await queryRunner.rollbackTransaction();
    await queryRunner.release();

    //Close the connection.
    await AppDataSource.destroy();
  });
});
