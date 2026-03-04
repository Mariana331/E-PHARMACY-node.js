import { model, Schema } from 'mongoose';

const supplierSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  suppliers: {
    type: String,
    enum: ['Square', 'Beximco', 'Uniliver', 'ACI', 'Acme'],
    default: 'ACI',
    required: true,
  },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
});

export const SuppliersCollection = model('supplier', supplierSchema);
