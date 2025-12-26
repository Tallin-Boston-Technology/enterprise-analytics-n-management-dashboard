import type { Priority, Timestamp, UUID } from "./common.types";
import type { User } from "./user.types";

export type ProjectStatus =
  | "planning"
  | "in-progress"
  | "on-hold"
  | "completed"
  | "cancelled";

export interface Project {
  id: UUID;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  startDate: Timestamp;
  endDate: Timestamp;
  budget: number;
  spent: number;
  progress: number;
  manager: User;
  teamMembers: User[];
  department: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectTask {
  id: UUID;
  projectId: UUID;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: Priority;
  assignedTo?: User;
  dueDate: Timestamp;
  estimatedHours: number;
  actualHours?: number;
  dependencies?: UUID[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProjectMilestone {
  id: UUID;
  projectId: UUID;
  name: string;
  description?: string;
  dueDate: Timestamp;
  status: "pending" | "achieved" | "missed";
  completionDate?: Timestamp;
  deliverales: string[];
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  priority: Priority;
  startDate: string;
  endDate: string;
  budget: number;
  managerId: UUID;
  teamMembersId: UUID;
  department: string;
  tags?: string[];
}

export interface UpdatedProjectPayload extends Partial<CreateProjectPayload> {
  status?: ProjectStatus;
  progress?: number;
  spent?: number;
}

export interface ProjectStatistics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overBudgetProjects: number;
  onTimeDelivery: number;
  averageProgress: number;
}
