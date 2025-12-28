/**
 * @file orderConstants.js
 * Defines all order-related constants: statuses, cancellation reasons, and cancellation request statuses.
 */

/**
 * Order lifecycle statuses.
 * Keys are used in backend logic; values are human-readable or same as key if no UI translation needed.
 */
export const ORDER_STATUS = Object.freeze({
  PENDING: "Pending", // Order created but not yet paid
  PAID: "Paid", // Payment successfully received
  PROCESSING: "Processing", // Order is being prepared / packed
  SHIPPED: "Shipped", // Order handed to courier
  DELIVERED: "Delivered", // Order delivered to customer
  CANCELLED: "Cancelled", // Order cancelled by user or system
  RETURN_REQUESTED: "Return Requested", // Customer requested a return
  RETURNED: "Returned", // Order returned to the warehouse
  REFUNDED: "Refunded", // Payment refunded to customer
});

/**
 * Array of order statuses for Mongoose enum validation
 */
export const ORDER_STATUS_VALUES = Object.values(ORDER_STATUS);

/**
 * Valid order cancellation reasons.
 * Keys are code-friendly, values are human-readable for API/UI.
 */
export const ORDER_CANCELLATION_REASONS = Object.freeze({
  ORDERED_BY_MISTAKE: "Ordered by mistake",
  BETTER_PRICE_FOUND: "Found a better price elsewhere",
  ITEM_ARRIVED_LATE: "Item arrived late",
  ITEM_NOT_AS_DESCRIBED: "Item not as described",
  ITEM_DAMAGED_DEFECTIVE: "Item was damaged or defective",
  CHANGED_MY_MIND: "Changed my mind",
  DUPLICATE_ORDER: "Duplicate order",
  WRONG_ITEM_RECEIVED: "Received the wrong item",
  BILLING_PAYMENT_ISSUE: "Billing or payment issue",
  OTHER: "Other",
});

/**
 * Array of cancellation reason values for Mongoose enum validation
 */
export const ORDER_CANCELLATION_REASON_VALUES = Object.values(
  ORDER_CANCELLATION_REASONS
);

/**
 * Statuses for order cancellation requests.
 * Keys are backend-friendly, values are human-readable.
 */
export const ORDER_CANCELLATION_STATUS = Object.freeze({
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
});

/**
 * Array of cancellation request statuses for Mongoose enum validation
 */
export const ORDER_CANCELLATION_STATUS_VALUES = Object.values(
  ORDER_CANCELLATION_STATUS
);
