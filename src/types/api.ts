/**
 * API response types for consistent response format
 */

/**
 * Standard API error response
 */
export interface ApiError {
  error: string;
  detail?: unknown;
}

/**
 * Paginated response for list endpoints
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasNextPage: boolean;
  nextPage?: number | null;
}

/**
 * Cursor-based pagination response for infinite scroll
 */
export interface CursorPaginatedResponse<T> {
  items: T[];
  nextCursor: number | null;
  hasNextPage: boolean;
}
