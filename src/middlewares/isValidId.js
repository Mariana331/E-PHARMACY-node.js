import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { shopId } = req.params;
  if (!isValidObjectId(shopId)) {
    throw createHttpError(400, 'Bad Request');
  }
  next();
};
