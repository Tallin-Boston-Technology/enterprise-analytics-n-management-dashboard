import type { Status, Timestamp, UUID } from "./common.types";

export type UserRole = "admin" | "manager" | "analyst" | "viewer";

export interface User {
  id: UUID;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  role: UserRole;
  status: Status;
  department?: string;
  jobTitle?: string;
  phoneNumber?: string;
  createdAt: Timestamp;
  updateAt: Timestamp;
  lastLoginAt?: Timestamp;
}

export interface AuthCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserPermissions {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canCreate: string[];
}

export interface UserProfile extends User {
  bio?: string;
  preferences: UserPreferences;
  permissions: UserPermissions;
}

export interface UserPreferences {
  theme: "light" | "dark" | "auto";
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };

  dashboardLayout?: string;
}

export interface UploadUserPayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  department?: string;
  jobTitle?: string;
  avatar?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
