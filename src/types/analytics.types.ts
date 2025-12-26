import { type DateRange, type Timestamp, type UUID } from "./common.types";

export interface DashboardStats {
  totatlRevenue: number;
  totalUsers: number;
  activeProjects: number;
  completionRate: number;
  revenueChange: number;
  usersChange: number;
  projectChange: number;
  completionChange: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  category?: string;
}

export interface TimeSeriesData {
  timestamp: Timestamp;
  value: number;
  label?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  growthRate?: number;
}

export interface UserActivityData {
  date: string;
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
}

export interface performanceMetrics {
  id: UUID;
  name: string;
  value: number;
  unit: string;
  change: number;
  changeType: "increase" | "decrease";
  status: "good" | "warning" | "critical";
  lastUpdated: Timestamp;
}

export interface AnalyticsFilter {
  dateRange: DateRange;
  category?: string;
  department?: string;
  status?: string;
  groupBy?: "day" | "week" | "month" | "quater" | "year";
}

export type ReportType =
  | "revenue"
  | "users"
  | "projects"
  | "performance"
  | "custom";
export type ReportFormat = "pdf" | "excel" | "csv" | "json";

export interface Report {
  id: UUID;
  title: string;
  type: ReportType;
  description?: string;
  createdBy: UUID;
  createdAt: Timestamp;
  filters: AnalyticsFilter;
  data: unknown;
  status: "generating" | "completed" | "failed";
}

export interface ReportGenerationRequest {
  title: string;
  type: ReportType;
  format: ReportFormat;
  filters: AnalyticsFilter;
  includeCharts?: boolean;
  recipients?: string[];
}

export interface KPI {
  id: UUID;
  name: string;
  description: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  progress: number;
  trend: "up" | "down" | "stable";
  category: string;
  lastUpdated: Timestamp;
}
