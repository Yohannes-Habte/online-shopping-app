/**
 * shippingPricing.js
 *
 * Professional shipping pricing module
 * Designed for Express.js, Node.js, and MongoDB.
 */

// -----------------------------------------------------------
// Base Pricing Table (per kg) by service type
// -----------------------------------------------------------  

export const BASE_PRICING_TABLE = Object.freeze({
  Standard: 5,
  Express: 8,
  Overnight: 12,
  SameDay: 15,
  Economy: 3,
  Freight: 2,
  International: 10,
  TwoDay: 7,
  NextDay: 11,
  Scheduled: 6,
});

// -----------------------------------------------------------
// Subtotal Discount Rates
// -----------------------------------------------------------
export const SUBTOTAL_DISCOUNT_RATES = Object.freeze([
  { minSubtotal: 50000, rate: 0.005 },
  { minSubtotal: 20000, rate: 0.01 },
  { minSubtotal: 10000, rate: 0.02 },
  { minSubtotal: 5000, rate: 0.03 },
  { minSubtotal: 2000, rate: 0.04 },
  { minSubtotal: 1000, rate: 0.05 },
  { minSubtotal: 500, rate: 0.1 },
  { minSubtotal: 0, rate: 0 }, // Default: no discount
]);

/**
 * Get the discount rate based on subtotal
 * @param {number} subtotal
 * @returns {number} discount rate (0-1)
 */
export const getDiscountRate = (subtotal) => {
  if (typeof subtotal !== "number" || subtotal < 0) {
    throw new Error("Invalid subtotal");
  }

  for (const tier of SUBTOTAL_DISCOUNT_RATES) {
    if (subtotal >= tier.minSubtotal) {
      return tier.rate;
    }
  }
  return 0;
};

// -----------------------------------------------------------
// Weight Discount Rates (per kg)
// -----------------------------------------------------------

export const WEIGHT_DISCOUNT_RATES = Object.freeze({
  1: 0.001,
  2: 0.002,
  3: 0.003,
  4: 0.004,
  5: 0.005,
  6: 0.006,
  7: 0.007,
  8: 0.008,
  9: 0.009,
  10: 0.01,
  11: 0.011,
  12: 0.012,
  13: 0.013,
  14: 0.014,
  15: 0.015,
  16: 0.016,
  17: 0.017,
  18: 0.018,
  19: 0.019,
  20: 0.02,
  21: 0.021,
  22: 0.022,
  23: 0.023,
  24: 0.024,
  25: 0.025,
  26: 0.026,
  27: 0.027,
  28: 0.028,
  29: 0.029,
  30: 0.03,
  31: 0.031,
  32: 0.032,
  33: 0.033,
  34: 0.034,
  35: 0.035,
  36: 0.036,
  37: 0.037,
  38: 0.038,
  39: 0.039,
  40: 0.04,
  41: 0.041,
  42: 0.042,
  43: 0.043,
  44: 0.044,
  45: 0.045,
  46: 0.046,
  47: 0.047,
  48: 0.048,
  49: 0.049,
  50: 0.05, // Max discount for weight
});

/**
 * Get weight discount rate
 * @param {number} weightKg
 * @returns {number} discount rate (0-1)
 */
export const getWeightDiscountRate = (weightKg) => {
  if (typeof weightKg !== "number" || weightKg <= 0) {
    throw new Error("Invalid weight");
  }

  if (weightKg > 50) return 0.05;
  return WEIGHT_DISCOUNT_RATES[Math.floor(weightKg)] || 0;
};

// -----------------------------------------------------------
// Calculate Base Shipping Price
// -----------------------------------------------------------

/**
 * Calculate base shipping price (before discounts)
 * @param {number} weightKg
 * @param {string} serviceType
 * @returns {number} base price
 */
export const calculateBaseShippingPrice = (weightKg, serviceType) => {
  if (typeof weightKg !== "number" || weightKg < 0) {
    throw new Error("Invalid weight");
  }

  const ratePerKg = BASE_PRICING_TABLE[serviceType];
  if (!ratePerKg) {
    throw new Error(`Invalid service type: ${serviceType}`);
  }

  const basePrice = weightKg * ratePerKg;
  return +basePrice.toFixed(2);
};

// -----------------------------------------------------------
// Calculate Final Shipping Price
// -----------------------------------------------------------

/**
 * Calculate final shipping price including subtotal and weight discounts
 * @param {number} subtotal
 * @param {number} weightKg
 * @param {string} serviceType
 * @returns {number} final shipping price
 */
export const calculateShippingPrice = (subtotal, weightKg, serviceType) => {
  if (typeof subtotal !== "number" || subtotal < 0) {
    throw new Error("Invalid subtotal");
  }

  if (typeof weightKg !== "number" || weightKg <= 0) {
    throw new Error("Invalid weight");
  }

  if (!BASE_PRICING_TABLE.hasOwnProperty(serviceType)) {
    throw new Error("Invalid service type");
  }

  const basePrice = calculateBaseShippingPrice(weightKg, serviceType);

  const weightDiscount = basePrice * getWeightDiscountRate(weightKg);
  const subtotalDiscount = basePrice * getDiscountRate(subtotal);

  const finalPrice = basePrice - (weightDiscount + subtotalDiscount);
  return +finalPrice.toFixed(2);
};
