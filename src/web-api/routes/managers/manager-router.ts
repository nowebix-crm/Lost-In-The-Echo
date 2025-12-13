import { Router } from 'express';

import * as ManagerController from '../../controllers/manager-controller';
import {
  authenticate,
  authorizeAdminOrManager,
} from '../../middlewares/auth-middleware';
import { validate } from '../../middlewares/validate';
import { asyncAuthHandler } from '../../middlewares/async-handler';
import {
  createManagerSchema,
  updateManagerSchema,
  managerIdParamSchema,
} from '../../validations/manager-validation';

const managerRouter = Router();

managerRouter.use(authenticate);
managerRouter.use(authorizeAdminOrManager);

managerRouter.get('/', asyncAuthHandler(ManagerController.getAllManagers));

managerRouter.get(
  '/:managerId',
  validate(managerIdParamSchema, 'params'),
  asyncAuthHandler(ManagerController.getManagerById)
);

managerRouter.post(
  '/',
  validate(createManagerSchema, 'body'),
  asyncAuthHandler(ManagerController.createManager)
);

managerRouter.put(
  '/:managerId',
  validate(managerIdParamSchema, 'params'),
  validate(updateManagerSchema, 'body'),
  asyncAuthHandler(ManagerController.updateManager)
);

managerRouter.delete(
  '/:managerId',
  validate(managerIdParamSchema, 'params'),
  asyncAuthHandler(ManagerController.deleteManager)
);

export { managerRouter };
