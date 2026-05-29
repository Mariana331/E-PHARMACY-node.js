import { ShopsCollection } from '../db/models/shop.js';
import { ProductsCollection } from '../db/models/product.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../utils/parseSortParams.js';
import { ReviewsCollection } from '../db/models/review.js';

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
  shopId,
  page = 1,
  perPage = 8,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = { shopId };

  if (filter.category) {
    query.category = filter.category;
  }

  if (filter.search) {
    query.$or = [
      { name: { $regex: filter.search, $options: 'i' } },
      { description: { $regex: filter.search, $options: 'i' } },
    ];
  }

  const [productsCount, products] = await Promise.all([
    ProductsCollection.countDocuments(query),
    ProductsCollection.find(query)
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
  if (!product) return null;
  const reviews = await ReviewsCollection.find();
  return { product, reviews };
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
