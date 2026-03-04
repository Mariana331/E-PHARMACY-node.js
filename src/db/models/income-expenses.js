import { model, Schema } from 'mongoose';

const incomeExpenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ['Income', 'Expense', 'Error'],
    required: true,
  },
});

export const IncomeExpensesCollection = model(
  'Income-Expense',
  incomeExpenseSchema,
  'Income-Expenses',
);
