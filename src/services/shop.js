import { ShopsCollection } from '../db/models/shop.js';
import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../utils/parseSortParams.js';

export const createShop = async (payload) => {
  const shop = await ShopsCollection.create({ ...payload });
  return shop;
};

export const getShopById = async (shopId) => {
  const shop = await ShopsCollection.findById(shopId);
  return shop;
};

export const updateShop = async (shopId, payload) => {
  const shop = await ShopsCollection.findByIdAndUpdate(shopId, payload, {
    new: true,
    runValidators: true,
  });
  return shop;
};

export const getAllProductsFromShop = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  shopId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find({ shopId });

  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }

  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return { data: products, ...paginationData };
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};

export const editProduct = async (productId, payload) => {
  const product = await ProductsCollection.findByIdAndUpdate(
    productId,
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return product;
};

export const deleteProduct = async (productId) => {
  return await ProductsCollection.findByIdAndDelete(productId);
};
