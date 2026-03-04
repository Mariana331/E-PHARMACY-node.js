import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  photo: { type: String },
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      'Delivered',
      'Processing',
      'Completed',
      'Shipped',
      'Cancelled',
      'Confirmed',
    ],
    required: true,
  },
  order_date: { type: Date, default: Date.now },
});

export const OrdersCollection = model('order', orderSchema);
