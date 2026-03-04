import {
  getStatisticsController,
  getClientGoodsStatisticsController,
} from '../controllers/statistics.js';
import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.use(authenticate);
router.get('/statistics', getStatisticsController);
router.get(
  '/statistics/:clientId/goods',
  isValidId('clientId'),
  getClientGoodsStatisticsController,
);

export default router;
