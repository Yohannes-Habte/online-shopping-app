/**
 * product.constants.js
 *
 * Product lifecycle and condition constants
 * Designed for Express.js, Node.js, and MongoDB (Mongoose)
 */

// --------------------------------------------------------------
// Product Status Constants
// --------------------------------------------------------------

export const PRODUCT_STATUS = Object.freeze({
  DRAFT: "DRAFT", // Not visible to customers
  ACTIVE: "ACTIVE", // Available for purchase
  OUT_OF_STOCK: "OUT_OF_STOCK", // Temporarily unavailable
  DISCONTINUED: "DISCONTINUED", // No longer produced
  ARCHIVED: "ARCHIVED", // Retained for historical records
});

/**
 * Product status enum for Mongoose
 */
export const PRODUCT_STATUS_ENUM = Object.freeze(Object.values(PRODUCT_STATUS));

// --------------------------------------------------------------
// Returned Product Condition
// --------------------------------------------------------------

const returnedProductCondition = (code, label) =>
  Object.freeze({ code, label });

export const RETURNED_PRODUCT_CONDITIONS = Object.freeze({
  NEW: returnedProductCondition("NEW", "New"),
  USED: returnedProductCondition("USED", "Used"),
  DAMAGED: returnedProductCondition("DAMAGED", "Damaged"),
});

/**
 * Returned product condition enum for Mongoose
 */
export const RETURNED_PRODUCT_CONDITION_ENUM = Object.freeze(
  Object.values(RETURNED_PRODUCT_CONDITIONS).map((c) => c.code)
);

// --------------------------------------------------------------
// Refund Status Constants
// --------------------------------------------------------------
export const REFUND_STATUS = Object.freeze({
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
});
/**
 * Refund status enum for Mongoose
 */
export const REFUND_STATUS_ENUM = Object.freeze(Object.values(REFUND_STATUS));
