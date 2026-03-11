import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'Id must be a number',
    'any.required': 'Id is required',
  }),
  name: Joi.string().min(3).max(20).required().messages({
    'string.empty': 'Name is required',
  }),

  suppliers: Joi.string()
    .valid('Square', 'Beximco', 'Uniliver', 'ACI', 'Acme')
    .required()
    .messages({
      'any.only': 'Invalid supplier',
      'string.empty': 'Suppliers is required',
    }),

  stock: Joi.number().integer().required().messages({
    'number.base': 'Stock must be a number',
    'any.required': 'Stock is required',
  }),

  price: Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'any.required': 'Price is required',
  }),

  category: Joi.string()
    .valid('Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart')
    .required()
    .messages({
      'any.only': 'Invalid category',
      'string.empty': 'Category is required',
    }),
}).options({ convert: true });
