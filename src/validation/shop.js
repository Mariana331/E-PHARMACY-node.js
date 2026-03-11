import Joi from 'joi';

export const shopSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
  }),

  owner: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Owner is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required',
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,13}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone must be a valid number',
      'string.empty': 'Phone is required',
    }),

  street: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Street is required',
  }),

  city: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'City is required',
  }),

  zip: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Zip is required',
  }),

  delivery: Joi.boolean().required().messages({
    'any.required': 'Delivery is required',
  }),
});
