import {
  signInController,
  signUpController,
  refreshTokenController,
} from './auth-controller';

const authControllers = {
  signIn: signInController,
  signUp: signUpController,
  refreshToken: refreshTokenController,
};

export { authControllers };
