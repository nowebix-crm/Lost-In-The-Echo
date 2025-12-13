import { Express } from 'express';

import { authRouter } from './auth/auth';
import { usersRouter } from './users/users';
import { managerRouter } from './managers/manager-router';
import { clientRouter } from './clients/client-router';
import { dealRouter } from './deals/deal-router';

export const registerRoutes = (app: Express) => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/managers', managerRouter);
  app.use('/api/clients', clientRouter);
  app.use('/api/deals', dealRouter);
};
