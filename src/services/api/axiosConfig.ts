import axios, { type AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.example.com";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 30000;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "content-Type": "application/json",
  },
});

export default axiosInstance;
