/**
 * --------------------------------------------------------------
 * User Address Type Constants
 * --------------------------------------------------------------
 * Defines all supported address categories for a user.
 * Used for validation and enum constraints in MongoDB (Mongoose).
 */

export const USER_ADDRESS_TYPES = Object.freeze(["HOME", "OFFICE", "BUSINESS"]);

/**
 * User roles for the e-commerce system
 * These can be used for role-based access control
 */
export const USER_ROLE = Object.freeze(["Customer", "Vendor", "Admin"]);
