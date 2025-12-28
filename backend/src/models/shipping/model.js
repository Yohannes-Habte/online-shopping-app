import mongoose from "mongoose";
import { calculateBaseShippingPrice } from "../utils/shipmentPricing.js";
import { calculateInsuranceFee } from "../utils/insurancePricing.js";
import {
  TRANSPORTATION_PROVIDERS,
  TRANSPORTATION_SERVICES,
  SHIPMENT_STATUSES,
  CONTINENT_CODES,
  REGION_CODES,
} from "../../constants/shipping.js";

const { Schema, model } = mongoose;

// Sub-schema: Contact Information
const contactSchema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false }
);

// Shipment Schema
const shipmentSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },

    provider: {
      type: String,
      enum: Object.values(TRANSPORTATION_PROVIDERS),
      required: true,
    },

    providerCode: { type: String, required: true, unique: true },

    serviceType: {
      type: String,
      enum: Object.values(TRANSPORTATION_SERVICES),
      required: true,
    },

    weightKg: { type: Number, required: true },

    basePrice: { type: Number }, // Will be calculated automatically

    insuranceSupported: { type: Boolean, default: false },

    insuranceFee: { type: Number, default: 0 },

    trackingNumber: { type: String, required: true },

    trackingUrlTemplate: { type: String, required: true },

    trackingUrl: { type: String },

    contact: { type: contactSchema, required: true },

    deliveryAddress: { type: Object, default: {} },

    continent: { type: String, enum: CONTINENT_CODES, required: true },

    region: { type: String, enum: Object.values(REGION_CODES), required: true },

    shippingStatus: {
      type: String,
      enum: Object.values(SHIPMENT_STATUSES),
      required: true,
    },

    expectedDeliveryDate: { type: Date },

    actualDeliveryDate: { type: Date },

    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

// Calculate basePrice automatically before saving
shipmentSchema.pre("validate", function (next) {
  if (
    this.isNew ||
    this.isModified("weightKg") ||
    this.isModified("serviceType")
  ) {
    this.basePrice = calculateBaseShippingPrice(
      this.weightKg,
      this.serviceType
    );
  }
  next();
});

// Calculate insurance fee if insurance is supported
shipmentSchema.pre("validate", function (next) {
  if (this.insuranceSupported) {
    this.insuranceFee = calculateInsuranceFee(this.basePrice);
  }
  next();
});

const Shipment = model("Shipment", shipmentSchema);
export default Shipment;
