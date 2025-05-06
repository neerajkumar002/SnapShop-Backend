import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    reviewMessage: {
      type: String,
      required: true,
    },
    reviewValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductReview = mongoose.model(
  "ProductReview",
  productReviewSchema
);
