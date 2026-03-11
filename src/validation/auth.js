import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Name is required',
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

  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': 'Password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is required',
  }),

  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
