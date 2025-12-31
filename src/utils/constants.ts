export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
    REVENUE: "/dashboard/revenue",
    USER_ACTIVITY: "/dashboard/user-activity",
  },
  PROJECTS: "/projects",
  NOTIFICATIONS: "/notifications",
  USERS: "/users",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSOWRD: "/forgot-password",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  ANALYTICS: "/analytics",
  REPORTS: "/reports",
  SETTINGS: "/settings",
  PROFILE: "/profile",
  NOTIFICATIONS: "/notifications",
  NOT_FOUND: "*",
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
  SIDEBAR_STATE: "sidebarState",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
} as const;

export const DATE_FORMATS = {
  DISPLAY: "MM dd, yyyy",
  DISPLAY_WITH_TIME: "MM dd, yyyy HH:mm",
  API: "yyyy-MM-dd",
  API_WITH_TIME: "yyyy-MM-dd HH:mm:ss",
  TIME_ONLY: "HH:mm",
};

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ["jpeg", "jpg", "png", "gif", "webp"],
  ALLOWED_DOCUMENT_TYPES: ["pdf", "doc", "docx", "xls", "xlsx", "csv"],
  ALLOWED_ALL_TYPES: [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "csv",
  ],
} as const;

export const STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Suspended", value: "suspended" },
] as const;

export const PRIORITY_OPTIONS = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
] as const;

export const PROJECT_STATUS_OPTIONS = [
  { label: "Planning", value: "planning" },
  { label: "In Progress", value: "in-progress" },
  { label: "On Hold", value: "on-hold" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
] as const;

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  ANALYST: "analyst",
  VIEWER: "viewer",
} as const;

export const NOTIFICATION_TYPE = {
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
  ERROR: "error",
} as const;

export const CHART_COLOURS = {
  PRIMARY: "#1976d2",
  SECONDARY: "#9c27b0",
  SUCCESS: "#2e7d32",
  ERROR: "#d32f2f",
  WARNING: "#ed6c02",
  INFO: "#0288d1",
  GREY: "#757575",
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
} as const;

export const ERROR_MESSAGE = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD:
    "Password must be atleast 8 characters with 1 uppercase, 1 lowercase, and 1 number",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_URL: "Please enter a valid URL",
  PASSWORD_MISMATCH: "Passwords do not match",
  NETWORK_ERROR: "Network Error. Please check your connection",
  SERVER_ERROR: "Server error. Please try again later",
  UNAUTHORISED: "You are not authorised for this action",
  NOT_FOUND: "Resource not found",
} as const;

export const SUCCESS_MESSAGES = {
  LOGIN: "login successful",
  LOGOUT: "Logout successful",
  REGISTER: "Registration successful",
  UPDATE: "Updated successfully",
  DELETE: "Deleted successfully",
  CREATE: "Created successfully",
  SAVE: "Saved successfully",
} as const;

export const TIMEOUTS = {
  DEBOUNCE: 300,
  TOAST: 3000,
  SESSION: 30 * 60 * 1000,
} as const;
