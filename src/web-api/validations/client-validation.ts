import Joi from 'joi';

export const createClientSchema = Joi.object({
  firstName: Joi.string().max(50).allow(null, ''),
  lastName: Joi.string().max(50).allow(null, ''),
  email: Joi.string().email().allow(null, ''),
  phone: Joi.string().max(30).allow(null, ''),
  birthday: Joi.date().allow(null),
  address: Joi.string().max(250).allow(null, ''),
  gender: Joi.string().valid('male', 'female').allow(null),
  source: Joi.string().valid('site', 'ad', 'referral', 'cold_call').allow(null),
  priority: Joi.string()
    .valid('low', 'medium', 'high', 'highest')
    .default('medium'),
  notes: Joi.string().allow(null, ''),
  managerId: Joi.string().uuid().allow(null),
});

export const updateClientSchema = Joi.object({
  firstName: Joi.string().max(50).allow(null, ''),
  lastName: Joi.string().max(50).allow(null, ''),
  email: Joi.string().email().allow(null, ''),
  phone: Joi.string().max(30).allow(null, ''),
  birthday: Joi.date().allow(null),
  address: Joi.string().max(250).allow(null, ''),
  status: Joi.string().valid('active', 'inactive'),
  gender: Joi.string().valid('male', 'female').allow(null),
  source: Joi.string().valid('site', 'ad', 'referral', 'cold_call').allow(null),
  priority: Joi.string().valid('low', 'medium', 'high', 'highest'),
  notes: Joi.string().allow(null, ''),
  managerId: Joi.string().uuid().allow(null),
}).min(1);

export const clientIdParamSchema = Joi.object({
  clientId: Joi.string().uuid().required(),
});

export const attachClientToManagerSchema = Joi.object({
  clientId: Joi.string().uuid().required(),
  managerId: Joi.string().uuid().required(),
});
