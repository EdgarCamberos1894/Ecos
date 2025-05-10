import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const rejectWithError = (error: unknown) =>
  Promise.reject(error instanceof Error ? error : new Error(String(error)));

api.interceptors.request.use((config) => {
  const token = (localStorage.getItem("userToken") ?? "").replace(/(^"|"$)/g, "").trim();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, rejectWithError);
