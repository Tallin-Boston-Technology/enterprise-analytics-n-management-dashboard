import { UIState } from "./../../types/redux.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = (UIState = {
  sidebarOpen: true,
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  isMobile: window.innerWidth < 768,
  notifications: {
    open: false,
    message: "",
    severity: "info",
  },
  modals: {},
});

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },

    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },

    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },

    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        severity: "success" | "error" | "warning" | "info";
      }>
    ) => {
      state.notifications = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },

    hideNotifications: (state) => {
      state.notifications.open = false;
    },

    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true;
    },

    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false;
    },

    toggleModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  toggleTheme,
  setIsMobile,
  showNotification,
  hideNotifications,
  openModal,
  closeModal,
  toggleModal,
  closeAllModals,
} = uiSlice.actions;

export default uiSlice.reducer;
