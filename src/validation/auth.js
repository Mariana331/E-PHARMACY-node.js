import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required('Name is required'),
  email: Joi.string()
    .email()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .required('Email is required'),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,13}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone must be a valid number',
    }),
  password: Joi.string().min(6).max(30).required('Password is required'),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format',
    )
    .required('Email is required'),
  password: Joi.string().required('Password is required'),
});
