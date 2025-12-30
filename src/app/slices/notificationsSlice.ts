import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { notificationsService } from "../../services/api";
import type {
  CreateNotificationPayload,
  Notification,
  NotificationState,
} from "../../types";

const initialState: NotificationState = {
  notification: [],
  unreadCount: 0,
  filters: {
    category: null,
    isRead: null,
  },
  isLoading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk<Notification[]>(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationsService.getAllNotifications();
      return response;

      // Mock response
      // const mockNotification: Notification[] = [
      //   {
      //     id: "1",
      //     userId: "1",
      //     type: "info",
      //     category: "system",
      //     title: "System Maintenance",
      //     message:
      //       "Scheduled maintenance will occur tonight from 2 AM to 4 AM EST.",
      //     isRead: false,
      //     actionURL: "/settings/maintenance",
      //     actionLabel: "View Details",
      //     createdAt: new Date().toISOString(),
      //   },
      //   {
      //     id: "2",
      //     userId: "1",
      //     type: "success",
      //     category: "project",
      //     title: "Project Completed",
      //     message:
      //       "Enterprise Dashboard Redesign has been successfully completed!",
      //     isRead: false,
      //     actionURL: "/projects/1",
      //     actionLabel: "View Project",
      //     createdAt: new Date(Date.now() - 3600000).toISOString(),
      //   },
      //   {
      //     id: "3",
      //     userId: "1",
      //     type: "warning",
      //     category: "alert",
      //     title: "Budget Alert",
      //     message:
      //       'Project "Mobile App Development" is approaching budget limit (85% used).',
      //     isRead: true,
      //     actionURL: "/projects/3",
      //     actionLabel: "Review Budget",
      //     createdAt: new Date(Date.now() - 7200000).toISOString(),
      //     readAt: new Date(Date.now() - 3600000).toISOString(),
      //   },
      //   {
      //     id: "4",
      //     userId: "1",
      //     type: "info",
      //     category: "user",
      //     title: "New Team Member",
      //     message:
      //       "John Smith has joined your team on the API Integration project.",
      //     isRead: true,
      //     actionURL: "/team",
      //     actionLabel: "View Team",
      //     createdAt: new Date(Date.now() - 86400000).toISOString(),
      //     readAt: new Date(Date.now() - 43200000).toISOString(),
      //   },
      //   {
      //     id: "5",
      //     userId: "1",
      //     type: "error",
      //     category: "system",
      //     title: "Failed Report Generation",
      //     message:
      //       "Your monthly analytics report failed to generate. Please try again.",
      //     isRead: false,
      //     actionURL: "/reports",
      //     actionLabel: "Retry",
      //     createdAt: new Date(Date.now() - 172800000).toISOString(),
      //   },
      // ];
      // return mockNotification;
    } catch (error: any) {
      return rejectWithValue(
        // error.response?.data?.message || "Failed to fetch notification"
        error.error?.message || "Failed to fetch notifications"
      );
    }
  }
);

export const markAsRead = createAsyncThunk<string, string>(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await notificationsService.markAsRead(notificationId);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(
        // error.response?.data?.message || "Failed to mark notification as read"
        error.error?.message || "Failed to mark notification as read"
      );
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await notificationsService.markAllAsRead();
      return;
    } catch (error: any) {
      return rejectWithValue(
        // error.response?.data?.message ||
        // "Failed to mark all notifications as read"
        error.error?.message || "Failed to mark all notifications as read"
      );
    }
  }
);

export const deleteNotification = createAsyncThunk<string, string>(
  "notifications/delete",
  async (notificationId, { rejectWithValue }) => {
    try {
      await notificationsService.deleteNotification(notificationId);
      return notificationId;
    } catch (error: any) {
      return rejectWithValue(
        // error.response?.data?.message || "Failed to delete notification"
        error.error?.message || "Failed to delete notification"
      );
    }
  }
);

export const createNotification = createAsyncThunk<
  Notification,
  CreateNotificationPayload
>("notifications/create", async (notificationData, { rejectWithValue }) => {
  try {
    const response = await notificationsService.createNotification(
      notificationData
    );
    return response;
  } catch (error: any) {
    return rejectWithValue(
      // error.response?.data?.message || "Failed to create a notication"
      error.error?.message || "Failed to create a notification"
    );
  }
});

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<NotificationState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = {
        category: null,
        isRead: null,
      };
    },

    clearError: (state) => {
      state.error = null;
    },

    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notification.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    // fetch notification
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notification = action.payload;
        state.unreadCount = action.payload.filter((n) => !n.isRead).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    //   mark as read
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      const notification = state.notification.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.isRead) {
        notification.isRead = true;
        notification.readAt = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    });

    //   mark all as read
    builder.addCase(markAllAsRead.fulfilled, (state) => {
      state.notification = state.notification.map((n) => ({
        ...n,
        isRead: true,
        readAt: n.readAt || new Date().toISOString(),
      }));
      state.unreadCount = 0;
    });

    //   delete notification
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      const notification = state.notification.find(
        (n) => n.id === action.payload
      );
      if (notification && !notification.isRead) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notification = state.notification.filter(
        (n) => n.id !== action.payload
      );
    });

    // create notification
    builder
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notification.unshift(action.payload);
        state.unreadCount += 1;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearError, addNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
