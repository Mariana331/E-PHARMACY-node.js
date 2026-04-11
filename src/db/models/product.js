import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
      required: true,
    },
    photo: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Hand', 'Head', 'Medicine', 'Leg', 'Dental Care', 'Heart'],
      default: 'Medicine',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ProductsCollection = model('product', productSchema);
