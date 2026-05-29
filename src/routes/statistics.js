import {
  getStatisticsController,
  getClientGoodsStatisticsController,
} from '../controllers/statistics.js';
import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/statistics', getStatisticsController);
router.get(
  '/statistics/:clientId/goods',
  isValidId('clientId'),
  getClientGoodsStatisticsController,
);

export default router;
