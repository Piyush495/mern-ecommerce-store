import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axiosInstance.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ user: res.data });
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during logout",
      );
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/profile");
      set({ user: response.data });
    } catch (error) {
      console.log(error.message);
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
  refreshToken: async () => {
    try {
      const response = await axiosInstance.post("/auth/refresh-token");
      return response.data;
    } catch (error) {
      set({ user: null });
      throw error;
    }
  },
}));

let refreshPromise = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axiosInstance(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        refreshPromise = null;
      }
    }
    return Promise.reject(error);
  },
);
