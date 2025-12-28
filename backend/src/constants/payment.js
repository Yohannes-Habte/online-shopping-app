/**
 * payment.js
 *
 * Centralized constants for payments, currencies, and payment lifecycle statuses.
 * Designed for Express.js, Node.js, and MongoDB (Mongoose).
 */

// ---------------------------
// Payment Methods
// ---------------------------

const createPaymentMethod = (code, label) => Object.freeze({ code, label });

export const PAYMENT_METHODS = Object.freeze({
  CASH_ON_DELIVERY: createPaymentMethod("CASH_ON_DELIVERY", "Cash on Delivery"),
  CARD: createPaymentMethod("CARD", "Debit/Credit Card"),
  STRIPE: createPaymentMethod("STRIPE", "Stripe"),
  PAYPAL: createPaymentMethod("PAYPAL", "PayPal"),
  UPI: createPaymentMethod("UPI", "UPI"),
  WALLET: createPaymentMethod("WALLET", "Wallet Balance"),
});

/**
 * Payment method codes for Mongoose enum
 */
export const PAYMENT_METHOD_CODES = Object.freeze(
  Object.values(PAYMENT_METHODS).map((pm) => pm.code)
);

/**
 * Array of third-party payment providers (useful for dropdowns or validation)
 */
export const PAYMENT_PROVIDERS = Object.freeze([
  "Stripe",
  "PayPal",
  "Bank Transfer",
  "Square",
  "Authorize.Net",
  "Razorpay",
  "Google Pay",
  "Apple Pay",
  "Cash On Delivery",
]);

// ---------------------------
// Currencies
// ---------------------------

const createCurrency = (code, name, symbol, decimalPlaces, locale) =>
  Object.freeze({ code, name, symbol, decimalPlaces, locale });

export const CURRENCIES = Object.freeze({
  USD: createCurrency("USD", "United States Dollar", "$", 2, "en-US"),
  EUR: createCurrency("EUR", "Euro", "€", 2, "de-DE"),
  GBP: createCurrency("GBP", "British Pound Sterling", "£", 2, "en-GB"),
  INR: createCurrency("INR", "Indian Rupee", "₹", 2, "en-IN"),
  AUD: createCurrency("AUD", "Australian Dollar", "A$", 2, "en-AU"),
  CAD: createCurrency("CAD", "Canadian Dollar", "C$", 2, "en-CA"),
});

/**
 * Currency codes enum for Mongoose or validation
 */
export const CURRENCY_CODES = Object.freeze(
  Object.keys(CURRENCIES).map((code) => code)
);

// ---------------------------
// Payment Statuses
// ---------------------------

export const PAYMENT_STATUS = Object.freeze({
  PENDING: "Pending", // Payment is pending
  INITIATED: "Initiated", // Payment started
  AUTHORIZED: "Authorized", // Authorized, pending capture
  SUCCESS: "Success", // Completed successfully
  FAILED: "Failed", // Payment failed
  PARTIALLY_REFUNDED: "Partially Refunded", // Partial refund
  REFUNDED: "Refunded", // Fully refunded
});

/**
 * Payment status enum for Mongoose
 */
export const PAYMENT_STATUS_VALUES = Object.freeze(
  Object.values(PAYMENT_STATUS)
);

// -----------------------------------------------------------
// Transaction Types
// -----------------------------------------------------------

const createTransactionType = (code, label) => Object.freeze({ code, label });

export const TRANSACTION_TYPES = Object.freeze({
  PAYOUT: createTransactionType("PAYOUT", "Payout"),
  REFUND: createTransactionType("REFUND", "Refund"),
  WITHDRAWAL: createTransactionType("WITHDRAWAL", "Withdrawal"),
  ADJUSTMENT: createTransactionType("ADJUSTMENT", "Adjustment"),
});

/**
 * Transaction type enum for Mongoose
 */
export const TRANSACTION_TYPE_ENUM = Object.freeze(
  Object.values(TRANSACTION_TYPES).map((t) => t.code)
);

// -----------------------------------------------------------
// Adjustment Reasons
// -----------------------------------------------------------

const createAdjustmentReason = (code, label) => Object.freeze({ code, label });

export const ADJUSTMENT_REASONS = Object.freeze({
  ORDER_RECONCILIATION: createAdjustmentReason(
    "ORDER_RECONCILIATION",
    "Order Reconciliation"
  ),

  MANUAL_FINANCIAL_ADJUSTMENT: createAdjustmentReason(
    "MANUAL_FINANCIAL_ADJUSTMENT",
    "Manual Financial Adjustment"
  ),

  PROMOTIONAL_CREDIT_ISSUANCE: createAdjustmentReason(
    "PROMOTIONAL_CREDIT_ISSUANCE",
    "Promotional Credit Issuance"
  ),

  OPERATIONAL_CORRECTION: createAdjustmentReason(
    "OPERATIONAL_CORRECTION",
    "Operational Correction"
  ),
});

/**
 * Adjustment reason enum for Mongoose
 */
export const ADJUSTMENT_REASON_ENUM = Object.freeze(
  Object.values(ADJUSTMENT_REASONS).map((r) => r.code)
);
