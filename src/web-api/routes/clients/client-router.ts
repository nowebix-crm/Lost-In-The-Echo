import { Router } from 'express';

import * as ClientController from '../../controllers/client-controller';
import {
  authenticate,
  authorizeAdminOrManager,
} from '../../middlewares/auth-middleware';
import { validate } from '../../middlewares/validate';
import { asyncAuthHandler } from '../../middlewares/async-handler';
import {
  createClientSchema,
  updateClientSchema,
  clientIdParamSchema,
  attachClientToManagerSchema,
} from '../../validations/client-validation';

const clientRouter = Router();

clientRouter.use(authenticate);
clientRouter.use(authorizeAdminOrManager);

clientRouter.get('/', asyncAuthHandler(ClientController.getAllClients));

clientRouter.get(
  '/:clientId',
  validate(clientIdParamSchema, 'params'),
  asyncAuthHandler(ClientController.getClientById)
);

clientRouter.post(
  '/create',
  validate(createClientSchema, 'body'),
  asyncAuthHandler(ClientController.createClient)
);

clientRouter.put(
  '/update/:clientId',
  validate(clientIdParamSchema, 'params'),
  validate(updateClientSchema, 'body'),
  asyncAuthHandler(ClientController.updateClient)
);

clientRouter.delete(
  '/delete/:clientId',
  validate(clientIdParamSchema, 'params'),
  asyncAuthHandler(ClientController.deleteClient)
);

clientRouter.post(
  '/attach-manager',
  validate(attachClientToManagerSchema, 'body'),
  asyncAuthHandler(ClientController.attachClientToManager)
);

export { clientRouter };
