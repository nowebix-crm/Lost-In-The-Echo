import { Express } from 'express';

import { authRouter } from './auth/auth';
import { usersRouter } from './users/users';
import { clientsRouter } from './clients/clients-router';

export const registerRoutes = (app: Express) => {
    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/clients', clientsRouter);
}