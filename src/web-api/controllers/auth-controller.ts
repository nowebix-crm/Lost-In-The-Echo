import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { TokenPayload, TokenStatus } from '../../constants/token-constants';
import { ROLES_IDS } from '../../constants/roles-constants';
import { USER_STATUSES } from '../../constants/users-contstants';

import * as UserService from '../../business-logic/services/user-service';
import * as UserRefreshTokenService from '../../business-logic/services/user-refresh-token-service';
import * as OrganizationService from '../../business-logic/services/organization-service';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from '../../business-logic/services/token-service';

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data: user } = await UserService.findUserByEmail(email, true);

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Invalid credentials. Please try again.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: 'Invalid credentials. Please try again.' });
  }

  const tokenPayload: TokenPayload = {
    id: user.id,
    email: user.email,
    roleId: user.roleId,
    organizationId: user.organizationId,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  await UserRefreshTokenService.saveUserRefreshToken(refreshToken, user.id);
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return res.status(200).json({ accessToken });
};

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, organizationName } = req.body;

  const userFromDB = await UserService.findUserByEmail(email);

  if (userFromDB.success) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const ownerId = uuidv4();

  const newOrganization = await OrganizationService.createOrganization({
    owner_id: ownerId,
    title: organizationName,
  });

  if (!newOrganization) {
    return res
      .status(500)
      .json({ message: 'Failed to create organization. Please try again.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: user, success } = await UserService.createUser({
    organization_id: newOrganization.id,
    email,
    password_hash: hashedPassword,
    first_name: firstName,
    last_name: lastName || null,
    role_id: ROLES_IDS.ORGANIZATION_OWNER,
    status: USER_STATUSES.ACTIVE,
  });

  if (!success || !user) {
    return res
      .status(500)
      .json({ message: 'Failed to create user. Please try again.' });
  }

  const tokenPayload: TokenPayload = {
    id: user.id,
    email: user.email,
    roleId: user.roleId,
    organizationId: user.organizationId,
  };

  const accessToken = generateAccessToken(tokenPayload);
  const refreshToken = generateRefreshToken(tokenPayload);

  await UserRefreshTokenService.saveUserRefreshToken(refreshToken, user.id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return res.status(201).json({ accessToken });
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const { status } = await verifyToken(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string
  );

  if (status === TokenStatus.INVALID) {
    return res
      .status(401)
      .json({ message: 'Invalid refresh token. Please try again.' });
  }

  const decoded = jwt.decode(refreshToken) as TokenPayload;

  const accessTokenNew = generateAccessToken(decoded);
  const refreshTokenNew = generateRefreshToken(decoded);

  await UserRefreshTokenService.saveUserRefreshToken(
    refreshTokenNew,
    decoded.id
  );

  res.cookie('refreshToken', refreshTokenNew, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  return res.status(200).json({ accessToken: accessTokenNew });
};
