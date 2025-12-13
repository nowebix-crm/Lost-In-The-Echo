import { Router } from 'express';

import { authControllers } from '../../controllers';
import { validate } from '../../middlewares/validate';
import { asyncHandler } from '../../middlewares/async-handler';
import { signInSchema, signUpSchema } from '../../validations/auth-validation';

const authRouter: Router = Router();

authRouter.post(
  '/sign-in',
  validate(signInSchema),
  asyncHandler(authControllers.signIn)
);
authRouter.post(
  '/sign-up',
  validate(signUpSchema),
  asyncHandler(authControllers.signUp)
);
authRouter.post('/refresh', asyncHandler(authControllers.refreshToken));

export { authRouter };
