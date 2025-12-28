import { HTTP_STATUS } from './httpStatus.js';

/**
 * Factory to create error objects
 * @param {string} code - Unique error code
 * @param {string} message - User-friendly error message
 * @param {number} httpStatus - HTTP status code
 * @returns {{ code: string, message: string, httpStatus: number }}
 */
const createError = (code, message, httpStatus) => ({
  code,
  message,
  httpStatus,
});

export const ERROR_CODES = Object.freeze({
  VALIDATION_ERROR: createError(
    'VALIDATION_ERROR',
    'One or more fields are invalid.',
    HTTP_STATUS.BAD_REQUEST
  ),

  AUTHENTICATION_ERROR: createError(
    'AUTHENTICATION_ERROR',
    'Authentication is required to access this resource.',
    HTTP_STATUS.UNAUTHORIZED
  ),

  AUTHORIZATION_ERROR: createError(
    'AUTHORIZATION_ERROR',
    'You do not have permission to perform this action.',
    HTTP_STATUS.FORBIDDEN
  ),

  NOT_FOUND: createError(
    'NOT_FOUND',
    'The requested resource was not found.',
    HTTP_STATUS.NOT_FOUND
  ),

  CONFLICT: createError(
    'CONFLICT',
    'A conflict occurred with the current state of the resource.',
    HTTP_STATUS.CONFLICT
  ),

  RATE_LIMIT_EXCEEDED: createError(
    'RATE_LIMIT_EXCEEDED',
    'Too many requests. Please try again later.',
    HTTP_STATUS.TOO_MANY_REQUESTS
  ),

  PAYMENT_FAILED: createError(
    'PAYMENT_FAILED',
    'Payment could not be processed. Please try again.',
    HTTP_STATUS.BAD_REQUEST
  ),

  INTERNAL_SERVER_ERROR: createError(
    'INTERNAL_SERVER_ERROR',
    'An unexpected error occurred. Please try again later.',
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  ),
});
