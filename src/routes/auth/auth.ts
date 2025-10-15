import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as UserService from '../../data-access/services/user-service';
import * as UserRefreshTokenService from '../../data-access/services/user-refresh-token-service';

import { generateAccessToken, generateRefreshToken, verifyToken } from '../../services/auth-services/token-service';
import { TokenPayload, TokenStatus } from '../../constants/token-constants';

const authRouter = Router();

authRouter.post('/sign-in', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { data: user } = await UserService.findUserByEmail(email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    const tokenPayload: TokenPayload = {
        id: user.id,
        email: user.email,
    }

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await UserRefreshTokenService.saveUserRefreshToken(refreshToken, user.id);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

    return res.status(200).json({ accessToken });
});

authRouter.post('/sign-up', async (req: Request, res: Response) => {
    const { email, password, first_name, role, status } = req.body;

    const userFromDB = await UserService.findUserByEmail(email);

    if (userFromDB.success) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: user, success } = await UserService.createUser({ email, password: hashedPassword, first_name, role, status });

    if (!success || !user) {
        return res.status(500).json({ message: 'Failed to create user. Please try again.' });
    }

    const tokenPayload: TokenPayload = {
        id: user.id,
        email: user.email,
    }

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await UserRefreshTokenService.saveUserRefreshToken(refreshToken, user.id);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

    return res.status(200).json({ accessToken });
});

authRouter.post('/refresh', async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const { status, message } = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string);

    if (status === TokenStatus.INVALID) {
        return res.status(401).json({ message: 'Invalid refresh token. Please try again.' });
    }

    const decoded = jwt.decode(refreshToken) as TokenPayload;

    const accessTokenNew = generateAccessToken(decoded);
    const refreshTokenNew = generateRefreshToken(decoded);

    await UserRefreshTokenService.saveUserRefreshToken(refreshTokenNew, decoded.id);

    res.cookie('refreshToken', refreshTokenNew, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

    return res.status(200).json({ accessToken: accessTokenNew });
});

export { authRouter };