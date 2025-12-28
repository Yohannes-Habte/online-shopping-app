import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Product Review Schema
 * Stores customer ratings and reviews for products
 */
const productReviewSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: { type: Number, required: true },

    comment: { type: String },

    // isVerifiedPurchase means the review was written by a user who actually bought the product, not just someone who viewed it or wants to leave feedback.
    isVerifiedPurchase: { type: Boolean, default: false },

    reviewedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Indexes
 * - Enforce one review per user per product
 */
productReviewSchema.index({ product: 1, user: 1 }, { unique: true });
productReviewSchema.index({ product: 1, rating: -1 });

const ProductReview = model("ProductReview", productReviewSchema);

export default ProductReview;
