import type {
  AnalyticsFilters,
  DashboardStats,
  KPI,
  PerformanceMetric,
  Report,
  ReportGenerationRequest,
  RevenueData,
  UserActivityData,
} from "../../../types";
import apiClient from "../apiClient";

class DashboardService {
  private readonly BASE_PATH = "/dashboard";

  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<DashboardStats>(
      `${this.BASE_PATH}/stats`
    );
    return response.data;
  }

  async getRevenueData(filters?: AnalyticsFilters): Promise<RevenueData[]> {
    const response = await apiClient.get<RevenueData[]>(
      `${this.BASE_PATH}/revenue`,
      {
        params: filters,
      }
    );
    return response.data;
  }

  async getUserActivity(
    filters?: AnalyticsFilters
  ): Promise<UserActivityData[]> {
    const response = await apiClient.get<UserActivityData[]>(
      `${this.BASE_PATH}/user-activity`,
      {
        params: filters,
      }
    );
    return response.data;
  }

  async getPerformanceMetrics(): Promise<PerformanceMetric[]> {
    const response = await apiClient.get<PerformanceMetric[]>(
      `${this.BASE_PATH}/performance-metrics`
    );
    return response.data;
  }

  async getKPIs(category?: string): Promise<KPI[]> {
    const response = await apiClient.get<KPI[]>(`${this.BASE_PATH}/kpis`, {
      params: { category },
    });
    return response.data;
  }

  async getKPIById(kpiId: string): Promise<KPI> {
    const response = await apiClient.get<KPI>(`${this.BASE_PATH}/kpi/${kpiId}`);
    return response.data;
  }

  async updateKPI(kpiId: string, data: Partial<KPI>): Promise<KPI> {
    const response = await apiClient.put<KPI>(
      `${this.BASE_PATH}/kpi/${kpiId}`,
      data
    );
    return response.data;
  }

  async getAllReports(): Promise<Report[]> {
    const response = await apiClient.get<Report[]>(
      `${this.BASE_PATH}/all-reports`
    );
    return response.data;
  }

  async getReportById(reportId: string): Promise<Report> {
    const response = await apiClient.put<Report>(
      `${this.BASE_PATH}/report/${reportId}`
    );
    return response.data;
  }

  async generateReport(request: ReportGenerationRequest): Promise<Report> {
    const response = await apiClient.post<Report>(
      `${this.BASE_PATH}/report/generate`,
      request
    );
    return response.data;
  }

  async downloadReport(reportId: string, fileName?: string): Promise<void> {
    await apiClient.download(
      `${this.BASE_PATH}/report/${reportId}/download`,
      fileName
    );
  }

  async deleteReport(reportId: string): Promise<void> {
    await apiClient.delete<void>(`${this.BASE_PATH}/report/${reportId}`);
  }

  async getAnalyticsOverview(filters: AnalyticsFilters): Promise<unknown> {
    const response = await apiClient.get<unknown>(
      `${this.BASE_PATH}/analytics/overview`,
      { params: filters }
    );
    return response.data;
  }

  async exportDashboardData(format: "csv" | "excel" | "pdf"): Promise<void> {
    await apiClient.download(
      `${this.BASE_PATH}/export?format=${format}`,
      `dashboard-export.${format}`
    );
  }
}

export default new DashboardService();
