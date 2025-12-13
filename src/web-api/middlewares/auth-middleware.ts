import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { TokenPayload } from '../../constants/token-constants';
import { ROLES_IDS } from '../../constants/roles-constants';

dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as TokenPayload;

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize =
  (...allowedRoles: number[]) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.roleId)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }

    next();
  };

export const authorizeAdminOrManager = authorize(
  ROLES_IDS.ADMIN,
  ROLES_IDS.ORGANIZATION_MANAGER
);
