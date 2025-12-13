import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest } from './auth-middleware';

type AsyncRequestHandler<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (fn: AsyncRequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const asyncAuthHandler =
  (fn: AsyncRequestHandler<AuthenticatedRequest>): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
  };
