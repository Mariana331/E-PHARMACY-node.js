import Joi from 'joi';

export const shopSchema = Joi.object({
  name: Joi.string().min(3).max(30).required('Name is required'),
  owner: Joi.string().min(3).max(30).required('Owner is required'),
  email: Joi.string()
    .email()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .required('Email is required'),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,13}$/)
    .required('Phone is required')
    .messages({
      'string.pattern.base': 'Phone must be a valid number',
    }),
  street: Joi.string().min(3).max(30).required('Street is required'),
  city: Joi.string().min(3).max(30).required('City is required'),
  zip: Joi.string().min(3).max(30).required('Zip is required'),
  delivery: Joi.boolean().required('Delivery is required'),
});
