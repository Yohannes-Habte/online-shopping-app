import mongoose from "mongoose";
import {
  PAYMENT_METHOD_CODES,
  PAYMENT_PROVIDERS,
  PAYMENT_STATUS_VALUES,
  CURRENCY_CODES,
  TRANSACTION_TYPE_ENUM,
} from "../../constants/payment.js";

const { Schema, model } = mongoose;

const paymentSchema = new Schema(
  {
    barcode: { type: String, unique: true, required: true },

    transactionType: {
      type: String,
      enum: TRANSACTION_TYPE_ENUM,
      required: true,
    },

    // If transactionType is PAYOUT, show me Order
    order: { type: Schema.Types.ObjectId, ref: "Order" },

    // If transaction type is REFUND, show me RefundRequest and ReturnedItem
    refundRequest: { type: Schema.Types.ObjectId, ref: "RefundRequest" },
    returnedItem: { type: Schema.Types.ObjectId, ref: "ReturnItem" },

    // If transaction type is WITHDRAWAL, show me Withdrawal
    withdrawal: { type: Schema.Types.ObjectId, ref: "Withdrawal" },

    method: { type: String, enum: PAYMENT_METHOD_CODES, required: true },
    provider: { type: String, enum: PAYMENT_PROVIDERS, required: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: PAYMENT_STATUS_VALUES,
    },
    transactionId: { type: String, unique: true, sparse: true },
    currency: { type: String, enum: CURRENCY_CODES, required: true },
    amountPaid: { type: Number, required: true },
    paymentDate: { type: Date },
    refunds: [refundDetailsSchema],
    metadata: { type: Map, of: Schema.Types.Mixed, default: {} },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Payment = model("Payment", paymentSchema);

export default Payment;
