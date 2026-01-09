import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { store } from "../../app/store";
import { logoutUser, refreshAccessToken } from "../../app/slices/authSlice";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const state = store.getState();
      const token = state.auth.accessToken;

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (import.meta.env.DEV) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          config.data
        );
      }

      return config;
    },

    (error: AxiosError) => {
      console.error("[Request Error]", error);
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (import.meta.env.DEV) {
        console.log(`[API Response] ${response.config.url}`, response.data);
      }
      return response;
    },

    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const state = store.getState();
        const refreshToken = state.auth.refreshToken;

        if (!refreshToken) {
          store.dispatch(logoutUser());
          return Promise.reject(error);
        }

        try {
          const resultAction = await store.dispatch(
            refreshAccessToken(refreshToken)
          );

          if (refreshAccessToken.fulfilled.match(resultAction)) {
            const newToken = resultAction.payload;
            processQueue(null, newToken);

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }

            return axiosInstance(originalRequest);
          } else {
            processQueue(error, null);
            store.dispatch(logoutUser());
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          store.dispatch(logoutUser());
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      if (error.response) {
        const { status, data } = error.response;

        if (import.meta.env.DEV) {
          console.error(`[API Error] ${status}`, data);
        }

        switch (status) {
          case 400:
            console.error("Bad Request:", data);
            break;
          case 403:
            console.error("Forbidden:", data);
            break;
          case 404:
            console.error("NotFound:", data);
            break;
          case 500:
            console.error("Internal Server Error:", data);
            break;
          default:
            console.error("API Error:", data);
        }
      } else if (error.request) {
        console.error("No Response recieved:", error.request);
      } else {
        console.error("Request Configuration error:", error.message);
      }

      return Promise.reject(error);
    }
  );
};
