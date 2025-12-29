import type {
  CreateProjectPayload,
  PaginatedResponse,
  PaginationParams,
  Project,
  ProjectMilestone,
  ProjectStatistics,
  ProjectTask,
  UpdatedProjectPayload,
} from "../../../types";
import apiClient from "../apiClient";

class ProjectsService {
  private readonly BASE_PATH = "/projects";

  async getProjects(
    params?: PaginationParams & {
      status?: string;
      priority?: string;
      searchItem?: string;
    }
  ): Promise<PaginatedResponse<Project>> {
    const response = await apiClient.get<PaginatedResponse<Project>>(
      this.BASE_PATH,
      { params }
    );
    return response.data;
  }

  async getProjectById(projectId: string): Promise<Project> {
    const response = await apiClient.get<Project>(
      `${this.BASE_PATH}/${projectId}`
    );
    return response.data;
  }

  async createProject(data: CreateProjectPayload): Promise<Project> {
    const response = await apiClient.post<Project>(`${this.BASE_PATH}`, data);
    return response.data;
  }

  async updateProject(
    projectId: string,
    data: UpdatedProjectPayload
  ): Promise<Project> {
    const response = await apiClient.put<Project>(
      `${this.BASE_PATH}/${projectId}`,
      data
    );
    return response.data;
  }

  async deleteProject(projectId: string): Promise<void> {
    await apiClient.delete<void>(`${this.BASE_PATH}/${projectId}`);
  }

  async getProjectStatistics(): Promise<ProjectStatistics> {
    const response = await apiClient.get<ProjectStatistics>(
      `${this.BASE_PATH}/statistics`
    );
    return response.data;
  }

  async getProjectTasks(projectId: string): Promise<ProjectTask[]> {
    const response = await apiClient.get<ProjectTask[]>(
      `${this.BASE_PATH}/${projectId}/tasks`
    );
    return response.data;
  }

  async createTask(
    projectId: string,
    taskData: Omit<ProjectTask, "id" | "createdAt" | "updatedAt">
  ): Promise<ProjectTask> {
    const response = await apiClient.post<ProjectTask>(
      `${this.BASE_PATH}/${projectId}/tasks`,
      taskData
    );
    return response.data;
  }

  async updateTask(
    projectId: string,
    taskId: string,
    taskData: Partial<ProjectTask>
  ): Promise<ProjectTask> {
    const response = await apiClient.put<ProjectTask>(
      `${this.BASE_PATH}/${projectId}/tasks/${taskId}`,
      taskData
    );
    return response.data;
  }

  async deleteTask(projectId: string, taskId: string): Promise<void> {
    await apiClient.delete<void>(
      `${this.BASE_PATH}/${projectId}/tasks/${taskId}`
    );
  }

  async getProjectMilestones(projectId: string): Promise<ProjectMilestone[]> {
    const response = await apiClient.get<ProjectMilestone[]>(
      `${this.BASE_PATH}/${projectId}/milestones`
    );
    return response.data;
  }

  async createMilestone(
    projectId: string,
    milestoneData: Omit<ProjectMilestone, "id">
  ): Promise<ProjectMilestone> {
    const response = await apiClient.post<ProjectMilestone>(
      `${this.BASE_PATH}/${projectId}/milestones`,
      milestoneData
    );
    return response.data;
  }

  async updateMilestone(
    projectId: string,
    milestoneId: string,
    milestoneData: Partial<ProjectMilestone>
  ): Promise<ProjectMilestone> {
    const response = await apiClient.put<ProjectMilestone>(
      `${this.BASE_PATH}/${projectId}/milestones/${milestoneId}`,
      milestoneData
    );
    return response.data;
  }

  async deleteMilestone(projectId: string, milestoneId: string): Promise<void> {
    await apiClient.delete<void>(
      `${this.BASE_PATH}/${projectId}/milestones/${milestoneId}`
    );
  }

  async addTeamMember(projectId: string, userId: string): Promise<Project> {
    const response = await apiClient.post<Project>(
      `${this.BASE_PATH}/${projectId}/team-members`,
      { userId }
    );
    return response.data;
  }

  async removeTeamMember(projectId: string, userId: string): Promise<Project> {
    const response = await apiClient.delete<Project>(
      `${this.BASE_PATH}/${projectId}/team-members/${userId}`
    );
    return response.data;
  }

  async updateProgress(projectId: string, progress: number): Promise<Project> {
    const response = await apiClient.patch<Project>(
      `${this.BASE_PATH}/${projectId}/progress/`,
      progress
    );
    return response.data;
  }

  async exportProject(
    projectId: string,
    format: "pdf" | "excel"
  ): Promise<void> {
    await apiClient.download(
      `${this.BASE_PATH}/${projectId}/export?format=${format}`,
      `project-${projectId}.${format}`
    );
  }
}

export default new ProjectsService();
