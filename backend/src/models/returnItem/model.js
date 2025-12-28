import mongoose from "mongoose";
import {
  RETURNED_PRODUCT_CONDITION_ENUM,
  REFUND_STATUS_ENUM,
} from "../../constants/product.js";

const { Schema, model } = mongoose;

// Return Item Ordered Schema
const returnItemSchema = new Schema(
  {
    // This was returnedId in the original code
    returnRequestId: { type: String, unique: true, required: true },

    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },

    // This was refundRequestIdLinked in the original code
    refundRequest: {
      type: Schema.Types.ObjectId,
      ref: "RefundRequest",
      required: true,
    },

    isProductReturned: { type: Boolean, default: false },

    // If isProductReturned is true, the rest of the fields are displayed and required
    // If isProductReturned is false, refund request will not be processed
    returnedDate: { type: Date, required: true },

    condition: {
      type: String,
      enum: RETURNED_PRODUCT_CONDITION_ENUM,
      required: true,
    },

    refundStatus: {
      type: String,
      enum: REFUND_STATUS_ENUM,
      required: true,
    },

    refundAmount: { type: Number, required: true },

    comments: { type: String, required: true },

    processedDate: { type: Date, required: true, required: true },

    rejectedReason: { type: String, default: null },

    processedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Return Request Model
const ReturnItem = model("ReturnItem", returnItemSchema);

export default ReturnItem;
