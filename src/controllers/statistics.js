import {
  getStatistics,
  getClientGoodsStatistics,
} from '../services/statistics.js';

export const getStatisticsController = async (req, res, next) => {
  try {
    const statistics = await getStatistics();

    res.status(200).json({
      status: 200,
      message: 'Successfully get statistics!',
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};

export const getClientGoodsStatisticsController = async (req, res, next) => {
  try {
    const { clientId } = req.params;
    const statistics = await getClientGoodsStatistics(clientId);
    res.status(200).json({
      status: 200,
      message: 'Successfully get statistics about goods!',
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};
