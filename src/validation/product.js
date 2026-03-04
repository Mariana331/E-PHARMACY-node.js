import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(20).required(),
  suppliers: Joi.string()
    .valid('Square', 'Beximco', 'Uniliver', 'ACI', 'Acme')
    .required(),
  stock: Joi.number().integer().required(),
  price: Joi.number().required(),
  category: Joi.string()
    .valid('Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart')
    .required(),
}).options({ convert: true });
