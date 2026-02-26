import { model, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    logo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

export const ShopsCollection = model('shop', shopSchema);
