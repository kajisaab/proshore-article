import { Router } from 'express';
import { validate } from '@core/validation';
import { userLoginSchema } from '@feature/auth/validationSchema/userLoginSchema';
import { asyncHandler } from '@core/middleware/ResponseHandler/asyncHandler';
import loginUsecase from '@feature/auth/usecase/login.usecase';
import { userSignupSchema } from '@feature/auth/validationSchema/userSignupSchema';
import signupUsecase from '@feature/auth/usecase/signup.usecase';

const router = Router();

router.post('/login', validate(userLoginSchema), asyncHandler(loginUsecase));

router.post('/signup', validate(userSignupSchema), asyncHandler(signupUsecase));

export default router;
