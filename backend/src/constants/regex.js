/**
 * Standardized regex patterns for validation across the application
 */
export const REGEX = Object.freeze({
  /**
   * Email validation (RFC 5322 simplified)
   * - Allows most standard email formats
   * - Example: user@example.com
   */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  /**
   * Password validation
   * - Minimum 8 characters
   * - At least one uppercase letter
   * - At least one number
   * - At least one special character @$!%*?&
   */
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,

  /**
   * International phone number validation (E.164 format)
   * - Starts with optional '+'
   * - Country code 1-3 digits
   * - Subscriber number up to 14 digits
   * - Example: +14155552671
   */
  PHONE: /^\+?[1-9]\d{1,14}$/,

  /**
   * MongoDB ObjectId validation
   * - 24 hexadecimal characters
   * - Case-insensitive
   */
  MONGO_OBJECT_ID: /^[a-fA-F\d]{24}$/,

  /**
   * Optional: URL validation (for product images, external links)
   * - Supports HTTP, HTTPS
   */
  URL: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,

  /**
   * Optional: ISO 8601 date format validation
   * - Example: 2025-12-24 or 2025-12-24T18:30:00Z
   */
  ISO_DATE: /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}Z)?$/,
});
