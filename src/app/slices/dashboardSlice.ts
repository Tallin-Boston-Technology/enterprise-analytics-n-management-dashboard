import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  DashboardState,
  DashboardStats,
  RevenueData,
  UserActivityData,
} from "../../types";
import { dashboardService } from "../../services/api";

const initialState: DashboardState = {
  stats: null,
  revenueData: [],
  userActivityData: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

export const fetchDashboardStats = createAsyncThunk<DashboardStats>(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getStats();
      return response;

      // Mock response
      // const mockStats: DashboardStats = {
      //   totatlRevenue: 1234567890,
      //   totalUsers: 54321,
      //   activeProjects: 87,
      //   completionRate: 94.5,
      //   revenueChange: 12.5,
      //   usersChange: 8.3,
      //   projectChange: -3.2,
      //   completionChange: 2.1,
      // };

      // return mockStats;
    } catch (error: unknown) {
      const apiError = error as { error?: { message?: string } };
      return rejectWithValue(
        apiError.error?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchRevenueData = createAsyncThunk<RevenueData[]>(
  "dashboard/fetchRevenueData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getRevenueData();
      return response;

      // Mock response
      // const mockData: RevenueData[] = [
      //   {
      //     month: "Jan",
      //     revenue: 85000,
      //     expenses: 45000,
      //     profit: 40000,
      //     growthRate: 12,
      //   },
      //   {
      //     month: "Feb",
      //     revenue: 92000,
      //     expenses: 48000,
      //     profit: 44000,
      //     growthRate: 8,
      //   },
      //   {
      //     month: "Mar",
      //     revenue: 98000,
      //     expenses: 52000,
      //     profit: 46000,
      //     growthRate: 6.5,
      //   },
      //   {
      //     month: "Apr",
      //     revenue: 105000,
      //     expenses: 55000,
      //     profit: 50000,
      //     growthRate: 7,
      //   },
      //   {
      //     month: "May",
      //     revenue: 115000,
      //     expenses: 58000,
      //     profit: 57000,
      //     growthRate: 9.5,
      //   },
      //   {
      //     month: "Jun",
      //     revenue: 125000,
      //     expenses: 62000,
      //     profit: 63000,
      //     growthRate: 8.7,
      //   },
      // ];
      // return mockData;
    } catch (error: unknown) {
      const apiError = error as { error?: { message?: string } };
      return rejectWithValue(
        apiError.error?.message || "Failed to fetch revenue data"
      );
    }
  }
);

export const fetchUserActivityData = createAsyncThunk<UserActivityData[]>(
  "dashboard/fetchUserActivity",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardService.getUserActivity();
      return response;

      // Mock response
      // const mockData: UserActivityData[] = [
      //   {
      //     date: "2024-01-01",
      //     activeUsers: 1200,
      //     newUsers: 150,
      //     returningUsers: 1050,
      //   },
      //   {
      //     date: "2024-01-02",
      //     activeUsers: 1350,
      //     newUsers: 180,
      //     returningUsers: 1170,
      //   },
      //   {
      //     date: "2024-01-03",
      //     activeUsers: 1450,
      //     newUsers: 200,
      //     returningUsers: 1250,
      //   },
      //   {
      //     date: "2024-01-04",
      //     activeUsers: 1300,
      //     newUsers: 170,
      //     returningUsers: 1130,
      //   },
      //   {
      //     date: "2024-01-05",
      //     activeUsers: 1500,
      //     newUsers: 220,
      //     returningUsers: 1280,
      //   },
      //   {
      //     date: "2024-01-06",
      //     activeUsers: 1600,
      //     newUsers: 250,
      //     returningUsers: 1350,
      //   },
      //   {
      //     date: "2024-01-07",
      //     activeUsers: 1400,
      //     newUsers: 190,
      //     returningUsers: 1210,
      //   },
      // ];
      // return mockData;
    } catch (error: unknown) {
      const apiError = error as { error?: { message?: string } };
      return rejectWithValue(
        apiError.error?.message || "Failed to fetch User activity stats"
      );
    }
  }
);

export const refreshDashboard = createAsyncThunk(
  "dashboard/refresh",
  async (_, { dispatch }) => {
    await Promise.all([
      dispatch(fetchDashboardStats()),
      dispatch(fetchRevenueData()),
      dispatch(fetchUserActivityData()),
    ]);
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearDashboardData: (state) => {
      state.stats = null;
      state.revenueData = [];
      state.userActivityData = [];
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Dashboard Stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch revenue data
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenueData = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch User activity data
    builder
      .addCase(fetchUserActivityData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserActivityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userActivityData = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUserActivityData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // refresh Dashboard
    builder
      .addCase(refreshDashboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshDashboard.fulfilled, (state) => {
        state.isLoading = false;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(refreshDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to refresh Dashboard";
      });
  },
});

export const { clearError, clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
