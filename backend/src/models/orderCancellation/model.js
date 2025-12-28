import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  ORDER_CANCELLATION_REASON_VALUES,
  ORDER_CANCELLATION_STATUS_VALUES,
} from "../../constants/order.js";

const { Schema, model } = mongoose;

const orderCancellationSchema = new Schema(
  {
    cancellationCode: { type: String, unique: true },

    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },

    requestedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    reason: {
      type: String,
      enum: ORDER_CANCELLATION_REASON_VALUES,
      required: true,
    },

    // If other, specify the reason
    otherReason: { type: String },

    cancellationStatus: {
      type: String,
      enum: ORDER_CANCELLATION_STATUS_VALUES,
    },

    reviewerNotes: { type: String },

    reviewedDate: { type: Date },
  },

  {
    timestamps: true,
  }
);

// Middleware to generate a unique cancellation code before saving
orderCancellationSchema.pre("save", function (next) {
  if (this.isNew) {
    this.cancellationCode = `CANC-${uuidv4()}`;
  }
  next();
});

const OrderCancellation = model("OrderCancellation", orderCancellationSchema);

export default OrderCancellation;
