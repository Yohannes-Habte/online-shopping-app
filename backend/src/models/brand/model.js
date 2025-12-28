import mongoose from "mongoose";

const { Schema, model } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true },

    slug: { type: String, required: true },

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },

    description: { type: String, required: true },

    logo: { type: String, required: true },

    website: { type: String },

    country: { type: String },

    isActive: { type: Boolean, default: true },

    seo: {
      title: {
        type: String,
        maxlength: 60,
      },
      description: {
        type: String,
        maxlength: 160,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* =========================
   Indexes
========================= */
brandSchema.index({ name: 1, supplier: 1 }, { unique: true });

const Brand = model("Brand", brandSchema);

export default Brand;
