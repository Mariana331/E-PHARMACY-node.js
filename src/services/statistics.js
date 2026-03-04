import { ProductsCollection } from '../db/models/product.js';
import { CustomersCollection } from '../db/models/customer.js';
import { SuppliersCollection } from '../db/models/supplier.js';
import { OrdersCollection } from '../db/models/order.js';
import { IncomeExpensesCollection } from '../db/models/income-expenses.js';

export const getStatistics = async () => {
  const products = await ProductsCollection.countDocuments();
  const suppliers = await SuppliersCollection.countDocuments();
  const customers = await CustomersCollection.countDocuments();

  const recentlyCustomers = await CustomersCollection.find().sort({ date: -1 });

  const incomeExpense = await IncomeExpensesCollection.find();

  return {
    products,
    suppliers,
    customers,
    recentlyCustomers,
    incomeExpense,
  };
};

export const getClientGoodsStatistics = async (clientId) => {
  const customer = await CustomersCollection.findById(clientId);

  if (!customer) {
    throw new Error('Customer not found');
  }
  const order = await OrdersCollection.find();
  const products = await ProductsCollection.find();

  return {
    customer,
    order,
    products,
  };
};
