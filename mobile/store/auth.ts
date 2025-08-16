import { ApiError, apiService } from "@/lib/api";
import { create } from "zustand";


export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  username?: string;
  avatarUrl?: string;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  stats?: {
    messageCount: number;
    activeDevices: number;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (formData: FormData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { name?: string; bio?: string }) => Promise<void>;
  uploadAvatar: (imageUri: string) => Promise<void>;
  deleteAvatar: () => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateOnlineStatus: (isOnline: boolean) => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  login: async (email: string, password: string) => {
    // Don't set global loading state for login
    try {
      const response = await apiService.login(email, password);
      set({
        user: response,
      });
      // Login successful - no error thrown
    } catch (error: any) {
      // Re-throw the error so the component can handle it
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    }
  },

  signup: async (formData: FormData) => {
    set({ isLoading: true });
    try {
      const response = await apiService.register(formData);
      set({
        user: response,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Registration failed. Please try again.");
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isLoading: false,
      });
    }
  },

  updateProfile: async (data: { name?: string; bio?: string }) => {
    const { user } = get();
    if (!user) throw new Error("No user logged in");

    set({ isLoading: true });
    try {
      const updatedProfile = await apiService.updateProfile(data);
      set({
        user: updatedProfile,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Failed to update profile");
    }
  },

  uploadAvatar: async (imageUri: string) => {
    const { user } = get();
    if (!user) throw new Error("No user logged in");

    set({ isLoading: true });
    try {
      const updatedProfile = await apiService.uploadAvatar(imageUri);
      set({
        user: updatedProfile,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Failed to upload avatar");
    }
  },

  deleteAvatar: async () => {
    const { user } = get();
    if (!user) throw new Error("No user logged in");

    set({ isLoading: true });
    try {
      const updatedProfile = await apiService.deleteAvatar();
      set({
        user: updatedProfile,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Failed to delete avatar");
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    set({ isLoading: true });
    try {
      await apiService.changePassword(currentPassword, newPassword);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Failed to change password");
    }
  },

  updateOnlineStatus: async (isOnline: boolean) => {
    try {
      await apiService.updateOnlineStatus(isOnline);
      const { user } = get();
      if (user) {
        set({
          user: { ...user, isOnline },
        });
      }
    } catch (error) {
      console.error("Failed to update online status:", error);
    }
  },

  refreshProfile: async () => {
    if (!apiService.isAuthenticated()) return;

    try {
      const profile = await apiService.getProfile();
      set({ user: profile });
    } catch (error) {
      console.error("Failed to refresh profile:", error);
      if (error instanceof ApiError && error.status === 401) {
        get().logout();
      }
    }
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      if (apiService.isAuthenticated()) {
        await get().refreshProfile();
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      await apiService.logout();
    } finally {
      set({
        isLoading: false,
        isInitialized: true,
      });
    }
  },
}));
