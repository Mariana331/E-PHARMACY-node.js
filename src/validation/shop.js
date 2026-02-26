import Joi from 'joi';

export const shopSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  owner: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  logo: Joi.string().min(3).max(30),
});
