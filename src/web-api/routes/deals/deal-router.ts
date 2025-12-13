import { Router } from 'express';

import * as DealController from '../../controllers/deal-controller';
import {
  authenticate,
  authorizeAdminOrManager,
} from '../../middlewares/auth-middleware';
import { validate } from '../../middlewares/validate';
import { asyncAuthHandler } from '../../middlewares/async-handler';
import {
  createDealSchema,
  updateDealSchema,
  dealIdParamSchema,
} from '../../validations/deal-validation';

const dealRouter = Router();

dealRouter.use(authenticate);
dealRouter.use(authorizeAdminOrManager);

dealRouter.get('/', asyncAuthHandler(DealController.getAllDeals));

dealRouter.get(
  '/:dealId',
  validate(dealIdParamSchema, 'params'),
  asyncAuthHandler(DealController.getDealById)
);

dealRouter.post(
  '/',
  validate(createDealSchema, 'body'),
  asyncAuthHandler(DealController.createDeal)
);

dealRouter.put(
  '/:dealId',
  validate(dealIdParamSchema, 'params'),
  validate(updateDealSchema, 'body'),
  asyncAuthHandler(DealController.updateDeal)
);

dealRouter.delete(
  '/:dealId',
  validate(dealIdParamSchema, 'params'),
  asyncAuthHandler(DealController.deleteDeal)
);

export { dealRouter };
