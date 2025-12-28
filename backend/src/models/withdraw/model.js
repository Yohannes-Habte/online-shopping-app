import mongoose from "mongoose";
import { WITHDRAWAL_PURPOSE_CODES } from "../../constants/withdrawal.js";

const { Schema, model } = mongoose;

const shoWithdrawSchema = new Schema(
  {
    withdrawalCode: { type: String, unique: true, required: true },

    withdrawId: { type: String, unique: true, required: true },

    withdrawalPurpose: {
      type: String,
      enum: WITHDRAWAL_PURPOSE_CODES,
      required: true,
    },

    // Show me supplier if and Only if "Product Procurement" is selected
    supplier: { type: String },

    // If "Customer Reimbursement" is selected, show me the RefundRequest and returnRequest IDs
    refundRequest: { type: Schema.Types.ObjectId, ref: "RefundRequest" },
    returnItem: { type: Schema.Types.ObjectId, ref: "ReturnItem" },

    amount: { type: Number, required: true },

    currency: { type: String, required: true },

    method: { type: String, required: true },

    notes: { type: String, required: true },

    processedDate: { type: Date, required: true },

    processedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  { timestamps: true }
);

const Withdrawal = model("Withdrawal", shoWithdrawSchema);
export default Withdrawal;
