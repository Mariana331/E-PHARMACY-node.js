import { Router } from 'express';
import { shopSchema } from '../validation/shop.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import {
  createShopController,
  getShopByIdController,
} from '../controllers/shop.js';

const router = Router();

router.use(authenticate);
router.post('/create', validateBody(shopSchema), createShopController);
router.get('/:shopId', isValidId, getShopByIdController);

export default router;
