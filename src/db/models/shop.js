import { model, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    delivery: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shop', shopSchema);
