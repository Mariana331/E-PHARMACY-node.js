import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  name: { type: String, required: true },
  testimonial: { type: String, required: true },
});

export const ReviewsCollection = model('review', reviewSchema);
