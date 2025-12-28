import mongoose from "mongoose";

const { Schema, model } = mongoose;

const subcategorySchema = new Schema(
  {
    subcategory: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Subcategory = model("Subcategory", subcategorySchema);
export default Subcategory;
