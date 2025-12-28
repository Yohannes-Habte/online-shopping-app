import mongoose from "mongoose";
import { ORDER_STATUS_VALUES } from "../../constants/order.js";
import { TRANSPORTATION_SERVICES } from "../../constants/shipping.js";

const { Schema } = mongoose;

// Schema for individual order items
const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    productColor: { type: String, required: true },
    productImage: { type: String, required: true },
    size: { type: Schema.Types.Mixed, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    total: { type: Number, required: true }, // Total price for this item (quantity * price)
  },
  { timestamps: true }
);

// Schema for shipping delivery address
const deliveryAddressSchema = new Schema(
  {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    streetName: { type: String, required: true },
    houseNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    service: {
      type: String,
      enum: Object.values(TRANSPORTATION_SERVICES),
      required: true,
    },
  },
  { timestamps: true }
);

// Schema for refund details
const refundDetailsSchema = new Schema({
  refundId: { type: String, required: true },
  refundRequestId: { type: Schema.Types.ObjectId, ref: "RefundRequest" },
  returnedId: { type: Schema.Types.ObjectId, ref: "ReturnRequest" },
  withdrawalId: { type: Schema.Types.ObjectId, ref: "Withdrawal" },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: "Transaction",
    required: true,
  },
  refundAmount: { type: Number, required: true },
  currency: { type: String, required: true },
  refundMethod: { type: String, required: true },
  refundDate: { type: Date, required: true },
  refundedBy: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
});

// Order Status history details
const orderStatusHistorySchema = new Schema(
  {
    status: { type: String, enum: ORDER_STATUS_VALUES, default: "Pending" },
    changedAt: { type: Date }, // Date of status change
    message: { type: String, trim: true }, // Message for status change
  },
  { timestamps: false }
);

// Main order schema
const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderedItems: { type: [orderItemSchema], required: true },
    itemsQty: {
      type: Number,
      required: true,
      default: function () {
        return this.orderedItems.reduce((sum, item) => sum + item.quantity, 0);
      },
    },

    shipping: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },

    deliveryAddress: { type: deliveryAddressSchema, required: true },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    // subtotal is the total price of ordered items before tax, shipping, and service fees
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 }, // Service charges for the app or platform
    grandTotal: { type: Number, required: true, min: 0 }, // subtotal + tax + shipping + service fees
    orderStatus: {
      type: String,
      enum: ORDER_STATUS_VALUES,
      default: "Pending",
    },

    statusHistory: [orderStatusHistorySchema],

    tracking: {
      carrier: { type: String, default: null },
      trackingNumber: { type: String, default: null },
      estimatedDeliveryDate: { type: Date, default: null },
    },

    transaction: { type: Schema.Types.ObjectId, ref: "Transaction" },

    refundRequests: [{ type: Schema.Types.ObjectId, ref: "RefundRequest" }],

    returnedItems: [{ type: Schema.Types.ObjectId, ref: "ReturnRequest" }],

    withdrawalRequests: [{ type: Schema.Types.ObjectId, ref: "Withdrawal" }],

    cancelledOrder: { type: Schema.Types.ObjectId, ref: "OrderCancellation" },

    deliveredAt: { type: Date },
    version: { type: Number, default: 1 },
  },
  { timestamps: true }
);

// Add indexes for frequent queries
orderSchema.index({ customer: 1, orderStatus: 1, createdAt: -1 });
orderSchema.index({ "payment.transactionId": 1 }, { sparse: true });
orderSchema.index({ "tracking.trackingNumber": 1 }, { sparse: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
