import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateProjectPayload,
  PaginatedResponse,
  Project,
  ProjectState,
  UpdatedProjectPayload,
} from "../../types";

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
  filters: {
    status: null,
    priority: null,
    searchTerm: null,
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk<
  PaginatedResponse<Project>,
  { page?: number; limit?: number }
>(
  "projects/fetchAll",
  async ({ page = 1, limit = 10 }, { getState, rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const state = getState() as RootState;
      // const { filters } = state.projects;
      // const response = await projectsService.getProjects({ page, limit, ...filters });

      // Mock response
      const mockProjects: Project[] = [
        {
          id: "1",
          name: "Enterprise Dashboard Redesign",
          description:
            "Complete redesign of the analytics dashboard with new features",
          status: "in-progress",
          priority: "high",
          startDate: "2024-01-15",
          endDate: "2024-06-30",
          budget: 150000,
          spent: 75000,
          progress: 50,
          manager: {
            id: "1",
            email: "manager@example.com",
            firstName: "Sarah",
            lastName: "Johnson",
            fullName: "Sarah Johnson",
            role: "manager",
            status: "active",
            createdAt: "2023-01-01",
            updatedAt: "2024-01-01",
          },
          teamMembers: [],
          department: "Engineering",
          tags: ["frontend", "design", "analytics"],
          createdAt: "2024-01-10",
          updatedAt: "2024-01-20",
        },
        {
          id: "2",
          name: "API Integration Phase 2",
          description:
            "Integration of third-party APIs for enhanced functionality",
          status: "planning",
          priority: "medium",
          startDate: "2024-02-01",
          endDate: "2024-04-30",
          budget: 80000,
          spent: 15000,
          progress: 20,
          manager: {
            id: "2",
            email: "tech.lead@example.com",
            firstName: "Michael",
            lastName: "Chen",
            fullName: "Michael Chen",
            role: "manager",
            status: "active",
            createdAt: "2023-01-01",
            updatedAt: "2024-01-01",
          },
          teamMembers: [],
          department: "Engineering",
          tags: ["backend", "api", "integration"],
          createdAt: "2024-01-15",
          updatedAt: "2024-01-25",
        },
        {
          id: "3",
          name: "Mobile App Development",
          description:
            "Native mobile application for iOS and Android platforms",
          status: "in-progress",
          priority: "critical",
          startDate: "2024-01-01",
          endDate: "2024-08-31",
          budget: 250000,
          spent: 120000,
          progress: 45,
          manager: {
            id: "3",
            email: "mobile.lead@example.com",
            firstName: "Emily",
            lastName: "Rodriguez",
            fullName: "Emily Rodriguez",
            role: "manager",
            status: "active",
            createdAt: "2023-01-01",
            updatedAt: "2024-01-01",
          },
          teamMembers: [],
          department: "Mobile",
          tags: ["mobile", "ios", "android"],
          createdAt: "2023-12-15",
          updatedAt: "2024-01-22",
        },
      ];

      const mockResponse: PaginatedResponse<Project> = {
        data: mockProjects,
        pagination: {
          currentPage: page,
          totalPages: 3,
          totalItems: 25,
          itemsPerPage: limit,
          hasNextPage: page < 3,
          hasPrevPage: page > 1,
        },
      };

      return mockResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const fetchProjectById = createAsyncThunk<Project, string>(
  "projects/fetchById",
  async (projectId, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await projectsService.getProjectById(projectId);

      // Mock response (return first mock project)
      const mockProject: Project = {
        id: projectId,
        name: "Enterprise Dashboard Redesign",
        description:
          "Complete redesign of the analytics dashboard with new features",
        status: "in-progress",
        priority: "high",
        startDate: "2024-01-15",
        endDate: "2024-06-30",
        budget: 150000,
        spent: 75000,
        progress: 50,
        manager: {
          id: "1",
          email: "manager@example.com",
          firstName: "Sarah",
          lastName: "Johnson",
          fullName: "Sarah Johnson",
          role: "manager",
          status: "active",
          createdAt: "2023-01-01",
          updatedAt: "2024-01-01",
        },
        teamMembers: [],
        department: "Engineering",
        tags: ["frontend", "design", "analytics"],
        createdAt: "2024-01-10",
        updatedAt: "2024-01-20",
      };

      return mockProject;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch project by Id"
      );
    }
  }
);

export const createProject = createAsyncThunk<Project, CreateProjectPayload>(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await projectsService.createProject(projectData);

      // Mock response
      const mockProject: Project = {
        id: Date.now().toString(),
        ...projectData,
        status: "planning",
        spent: 0,
        progress: 0,
        manager: {
          id: projectData.managerId,
          email: "manager@example.com",
          firstName: "John",
          lastName: "Doe",
          fullName: "John Doe",
          role: "manager",
          status: "active",
          createdAt: "2023-01-01",
          updatedAt: "2024-01-01",
        },
        teamMembers: [],
        tags: projectData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return mockProject;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }
);

export const updateProject = createAsyncThunk<
  Project,
  { id: string; data: UpdatedProjectPayload }
>("projects/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    // TODO: Replace with actual API call
    // const response = await projectsService.updateProject(id, data);

    // Mock response (just return updated data)
    const mockProject: Project = {
      id,
      name: data.name || "Updated Project",
      description: data.description || "Updated description",
      status: data.status || "in-progress",
      priority: data.priority || "medium",
      startDate: data.startDate || "2024-01-01",
      endDate: data.endDate || "2024-12-31",
      budget: data.budget || 100000,
      spent: data.spent || 50000,
      progress: data.progress || 50,
      manager: {
        id: "1",
        email: "manager@example.com",
        firstName: "John",
        lastName: "Doe",
        fullName: "John Doe",
        role: "manager",
        status: "active",
        createdAt: "2023-01-01",
        updatedAt: "2024-01-01",
      },
      teamMembers: [],
      department: data.department || "Engineering",
      tags: data.tags || [],
      createdAt: "2024-01-01",
      updatedAt: new Date().toISOString(),
    };
    return mockProject;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update project"
    );
  }
});

export const deleteProject = createAsyncThunk<string, string>(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // await projectsService.deleteProject(projectId);
      return projectId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSelectedproject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<ProjectState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: null,
        priority: null,
        searchTerm: null,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch project
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // fetch project by Id
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // create project
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // update project
    builder
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.selectedProject?.id === action.payload.id) {
          state.selectedProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // delete project
    builder
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
        state.pagination.totalItems -= 1;

        if (state.selectedProject?.id === action.payload) {
          state.selectedProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedproject,
  setFilters,
  clearFilters,
  clearError,
  setCurrentPage,
} = projectSlice.actions;

export default projectSlice.reducer;
