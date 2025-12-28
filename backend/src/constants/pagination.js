/**
 * Pagination defaults and constants
 */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE: 1,           // Default page number
  DEFAULT_LIMIT: 10,         // Default items per page
  MAX_LIMIT: 100,            // Maximum allowed items per page
  SORT_ORDER: Object.freeze({
    ASC: 1,                  // Ascending order
    DESC: -1,                // Descending order
  }),
});
