import { createShop, getShopById } from '../services/shop.js';
import createHttpError from 'http-errors';

export const createShopController = async (req, res) => {
  const shop = await createShop({ ...req.body, userId: req.user._id });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a shop!',
    data: shop,
  });
};

export const getShopByIdController = async (req, res, next) => {
  const { shopId } = req.params;
  const shop = await getShopById(shopId);

  if (!shop) {
    return next(createHttpError(404, 'Shop is not found!'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found shop with id ${shopId}!`,
    data: shop,
  });
};
