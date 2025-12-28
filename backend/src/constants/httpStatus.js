/**
 * Standard HTTP status codes
 */
export const HTTP_STATUS = Object.freeze({
  // Success
  OK: 200, // Request succeeded
  CREATED: 201, // Resource created successfully
  ACCEPTED: 202, // Request accepted, processing
  NO_CONTENT: 204, // Request succeeded, no content returned

  // Client Errors
  BAD_REQUEST: 400, // Invalid request syntax or parameters
  UNAUTHORIZED: 401, // Authentication required
  FORBIDDEN: 403, // Permission denied
  NOT_FOUND: 404, // Resource not found
  CONFLICT: 409, // Conflict with current state
  TOO_MANY_REQUESTS: 429, // Rate limit exceeded

  // Server Errors
  INTERNAL_SERVER_ERROR: 500, // Unexpected server error
  SERVICE_UNAVAILABLE: 503, // Server temporarily unavailable
});


