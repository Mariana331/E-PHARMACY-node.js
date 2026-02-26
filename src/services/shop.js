import { ShopsCollection } from '../db/models/shop.js';
// import createHttpError from 'http-errors';

export const createShop = async (payload) => {
  const shop = await ShopsCollection.create({ ...payload });
  return shop;
};

export const getShopById = async (shopId) => {
  const shop = await ShopsCollection.findById(shopId);
  return shop;
};
