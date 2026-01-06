export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface SortOption {
  field: string;
  order: "asc" | "desc";
}

export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

export type Status = "active" | "inactive" | "pending" | "suspended";
export type Priority = "low" | "medium" | "high" | "critical";

export type UUID = string;
export type Timestamp = string | Date;
