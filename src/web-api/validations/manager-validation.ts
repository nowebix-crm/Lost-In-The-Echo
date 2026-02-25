import Joi from 'joi';

export const createManagerSchema = Joi.object({
  firstName: Joi.string().max(50).required(),
  lastName: Joi.string().max(50).allow(null, ''),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const updateManagerSchema = Joi.object({
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50).allow(null, ''),
  email: Joi.string().email(),
}).min(1);

export const managerIdParamSchema = Joi.object({
  managerId: Joi.string().uuid().required(),
});
