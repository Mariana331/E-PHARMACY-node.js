import {
  createShop,
  getShopById,
  updateShop,
  getAllProductsFromShop,
  createProduct,
  getProductById,
  editProduct,
  deleteProduct,
} from '../services/shop.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const createShopController = async (req, res) => {
  const shop = await createShop({ ...req.body, userId: req.user._id });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a shop!',
    data: { shop: shop },
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
    data: { shop: shop },
  });
};

export const updateShopController = async (req, res) => {
  const { shopId } = req.params;
  const shop = await updateShop(shopId, req.body);
  if (shop === null) {
    throw new createHttpError.NotFound('Shop not found!');
  }

  res.json({
    status: 200,
    message: 'Shop update successfully!',
    data: { shop: shop },
  });
};

export const getAllProductsFromShopController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { shopId } = req.params;

  const products = await getAllProductsFromShop({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    shopId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const createProductController = async (req, res) => {
  const avatar = req.file;
  const { shopId } = req.params;

  let photo;

  if (avatar) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photo = await saveFileToCloudinary(avatar);
    } else {
      photo = `/uploads/${avatar.filename}`;
    }
  }

  const product = await createProduct({
    ...req.body,
    shopId,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: { product: product },
  });
};

export const getProductByIdController = async (req, res, next) => {
  const { productId } = req.params;
  const result = await getProductById(productId);
  if (!result) {
    return next(createHttpError(404, 'Product not found!'));
  }
  const { product, reviews } = result;
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: { product, reviews },
  });
};

export const editProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await editProduct(productId, req.body);
  if (product.updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Product edited successfully!',
      data: product,
    });
  }
  res.status(201).json({
    status: 201,
    message: 'Product edited successfully!',
    data: { product: product },
  });
};

export const deleteProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);

  if (product === null) {
    return next(createHttpError(404, 'Product not found!'));
  }
  res.json({
    status: 200,
    message: 'Product deleted successfully!',
  });
};
