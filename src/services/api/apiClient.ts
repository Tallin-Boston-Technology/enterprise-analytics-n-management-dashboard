import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosConfig";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./interceptors";
import type { ApiError, ApiResponse } from "../../types";

setupRequestInterceptor(axiosInstance);
setupResponseInterceptor(axiosInstance);

class ApiClient {
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(
        url,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> =
        await axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async upload<T>(
    url: string,
    formData: FormData,
    onUploadProgress?: (ProgressEvent: unknown) => void
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async download(url: string, fileName?: string): Promise<void> {
    try {
      const response = await axiosInstance.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ApiError {
    const axiosError = error as {
      response?: {
        status: number;
        data?: {
          message?: string;
          details?: Record<string, unknown>;
        };
      };
      request?: unknown;
      message?: string;
    };

    if (axiosError.response) {
      return {
        success: false,
        error: {
          code: axiosError.response.status.toString(),
          message:
            axiosError.response.data?.message ||
            axiosError.message ||
            "AN Error has occurred",
          details: axiosError.response.data?.details || {},
        },
        timestamp: new Date().toISOString(),
      };
    } else if (axiosError.request) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Network error. Please check your connection",
          details: {},
        },
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        success: false,
        error: {
          code: "REQUEST_ERROR",
          message: axiosError.message || "An unexpected error has occurred",
          details: {},
        },
        timestamp: new Date().toISOString(),
      };
    }
  }
}

export default new ApiClient();
