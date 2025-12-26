import type { DashboardStats } from "./analytics.types";
import type { LoadingState } from "./common.types";
import type { Notification } from "./notification.types";
import type { Project } from "./project.types";
import type { User } from "./user.types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface DashboardState extends LoadingState {
  state: DashboardStats | null;
  revenueData: unknown[];
  userActivityData: unknown[];
  lastUpdated: string | null;
}

export interface ProjectState extends LoadingState {
  projects: Project[];
  selectedProject: Project | null;
  filters: {
    status: string | null;
    priority: string | null;
    searchTerm: string | null;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

export interface NotificationState extends LoadingState {
  notification: Notification[];
  unreadCount: number;
  filters: {
    category: string | null;
    isRead: boolean | null;
  };
}

export interface UIState {
  sidebarOption: boolean;
  theme: "light" | "dark";
  isMobile: boolean;
  notifications: {
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  };
  modals: {
    [key: string]: boolean;
  };
}

export interface RootState {
  auth: AuthState;
  dashboard: DashboardState;
  projects: ProjectState;
  notifications: NotificationState;
  ui: UIState;
}
