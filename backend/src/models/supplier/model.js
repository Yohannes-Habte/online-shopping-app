// Importing mongoose and its Schema constructor
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const supplierSchema = new Schema(
  {
    barcode: { type: String, unique: true, required: true },

    name: { type: String, required: true },

    description: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    phone: { type: String, required: true },

    address: { type: String, required: true },

    country: { type: String, required: true },

    // A flag to mark if the supplier is active or inactive
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,

    // Optionally add indexing for better performance in large datasets
    index: { fields: { name: 1, isActive: 1 } },
  }
);

supplierSchema.index({ name: 1 });
const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
