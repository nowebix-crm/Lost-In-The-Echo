import Joi from 'joi';

export const createDealSchema = Joi.object({
  title: Joi.string().max(150).required(),
  clientId: Joi.string().uuid().allow(null),
  companyId: Joi.string().uuid().allow(null),
  managerId: Joi.string().uuid().required(),
  amount: Joi.number().min(0).default(0),
  currency: Joi.string().length(3).default('USD'),
  stageId: Joi.string().uuid().required(),
});

export const updateDealSchema = Joi.object({
  title: Joi.string().max(150),
  clientId: Joi.string().uuid().allow(null),
  companyId: Joi.string().uuid().allow(null),
  managerId: Joi.string().uuid(),
  amount: Joi.number().min(0),
  currency: Joi.string().length(3),
  stageId: Joi.string().uuid(),
}).min(1);

export const dealIdParamSchema = Joi.object({
  dealId: Joi.string().uuid().required(),
});
