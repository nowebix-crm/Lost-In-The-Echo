import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { TokenPayload, TokenStatus } from '../../constants/token-constants';

dotenv.config();

const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '1h',
  });
};

const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '7d',
  });
};

const verifyToken = (
  token: string,
  secret: string
): Promise<{ status: TokenStatus; message: string }> => {
  return new Promise((resolve) => {
    if (!token) {
      return resolve({
        status: TokenStatus.INVALID,
        message: 'Token not provided',
      });
    }
    jwt.verify(token, secret, (err) => {
      if (err) {
        return resolve({
          status: TokenStatus.INVALID,
          message: err.message,
        });
      }
      return resolve({
        status: TokenStatus.VALID,
        message: 'Token is valid',
      });
    });
  });
};

export { generateAccessToken, generateRefreshToken, verifyToken };
