import { Router } from 'express';
import { shopSchema } from '../validation/shop.js';
import { productSchema } from '../validation/product.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';
import {
  createShopController,
  getShopByIdController,
  updateShopController,
  getAllProductsFromShopController,
  createProductController,
  getProductByIdController,
  editProductController,
  deleteProductController,
} from '../controllers/shop.js';

const router = Router();

router.use(authenticate);

router.post('/create', validateBody(shopSchema), createShopController);

router.get('/:shopId', isValidId('shopId'), getShopByIdController);

router.put(
  '/:shopId/update',
  isValidId('shopId'),
  validateBody(shopSchema),
  updateShopController,
);

router.get(
  '/:shopId/product',
  isValidId('shopId'),
  getAllProductsFromShopController,
);

router.post(
  '/:shopId/product/add',
  isValidId('shopId'),
  upload.single('photo'),
  validateBody(productSchema),
  createProductController,
);
router.get(
  '/:shopId/product/:productId',
  isValidId('shopId'),
  getProductByIdController,
);

router.put(
  '/:shopId/product/:productId/edit',
  isValidId('shopId'),
  upload.single('photo'),
  validateBody(productSchema),
  editProductController,
);

router.delete(
  '/:shopId/product/:productId/delete',
  isValidId('shopId'),
  deleteProductController,
);

export default router;
