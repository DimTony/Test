// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";

// // Types
// export interface ApiResponse<T = any> {
//   data: T;
//   message?: string;
//   success: boolean;
// }

// export interface ApiErrorData {
//   message: string;
//   status: number;
//   code?: string;
// }

// export interface AuthTokens {
//   accessToken: string;
//   refreshToken: string;
// }

// export interface LoginResponse {
//   id: string;
//   name: string;
//   email: string;
//   username: string;
//   accessToken: string;
//   refreshToken: string;
//   isOnline: boolean;
//   lastSeen: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface UserProfile {
//   id: string;
//   name: string;
//   email: string;
//   bio?: string;
//   avatarUrl?: string;
//   isOnline: boolean;
//   lastSeen: string;
//   createdAt: string;
//   updatedAt: string;
//   stats: {
//     messageCount: number;
//     activeDevices: number;
//   };
// }

// // Constants
// const API_BASE_URL =
//   Constants.expoConfig?.extra?.apiUrl || "http://localhost:3001/api";
// const TOKEN_STORAGE_KEY = "auth_tokens";

// class ApiService {
//   private baseURL: string;
//   private accessToken: string | null = null;
//   private refreshToken: string | null = null;
//   private isRefreshing = false;

//   constructor() {
//     this.baseURL = API_BASE_URL;
//     this.initializeTokens();
//   }

//   // Initialize tokens from secure storage
//   private async initializeTokens() {
//     try {
//       const tokensString = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
//       if (tokensString) {
//         const tokens: AuthTokens = JSON.parse(tokensString);
//         this.accessToken = tokens.accessToken;
//         this.refreshToken = tokens.refreshToken;
//       }
//     } catch (error) {
//       console.error("Failed to initialize tokens:", error);
//     }
//   }

//   // Store tokens securely
//   private async storeTokens(tokens: AuthTokens) {
//     try {
//       await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
//       this.accessToken = tokens.accessToken;
//       this.refreshToken = tokens.refreshToken;
//     } catch (error) {
//       console.error("Failed to store tokens:", error);
//       throw new ApiError(
//         "Failed to store authentication tokens",
//         0,
//         "STORAGE_ERROR"
//       );
//     }
//   }

//   // Clear tokens
//   private async clearTokens() {
//     try {
//       await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
//       this.accessToken = null;
//       this.refreshToken = null;
//     } catch (error) {
//       console.error("Failed to clear tokens:", error);
//     }
//   }

//   // Main request method
//   private async request<T = any>(
//     endpoint: string,
//     options: RequestInit = {},
//     requiresAuth = true
//   ): Promise<ApiResponse<T>> {
//     const url = `${this.baseURL}${endpoint}`;

//     const headers: Record<string, string> = {
//       ...((options.headers as Record<string, string>) || {}),
//     };

//     // Don't set Content-Type for FormData (let browser set it with boundary)
//     // if (!(options.body instanceof FormData)) {
//     //   headers["Content-Type"] = "application/json";
//     // }

//     if (requiresAuth && this.accessToken) {
//       headers.Authorization = `Bearer ${this.accessToken}`;
//     }

//     const config: RequestInit = {
//       ...options,
//       headers,
//     };

//     try {
//       const response = await fetch(url, config);
//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new ApiError(
//           responseData.message || "Request failed",
//           response.status,
//           responseData.code
//         );
//       }

//       return responseData;
//     } catch (error) {
//       if (error instanceof ApiError) {
//         throw error;
//       }
//       throw new ApiError(
//         error instanceof Error ? error.message : "Network error",
//         0,
//         "NETWORK_ERROR"
//       );
//     }
//   }

//   // Public API methods

//   // Authentication
//   async login(email: string, password: string): Promise<LoginResponse> {
//     const response = await this.request<LoginResponse>(
//       "/auth/login",
//       {
//         method: "POST",
//         body: JSON.stringify({ username: email, password }),
//       },
//       false // Don't require auth for login
//     );

//     // Store tokens after successful login
//     await this.storeTokens({
//       accessToken: response.data.accessToken,
//       refreshToken: response.data.refreshToken,
//     });

//     return response.data;
//   }

//   async register(formData: FormData): Promise<LoginResponse> {
//     const response = await this.request<LoginResponse>(
//       "/auth/create", // Updated to match your backend route
//       {
//         method: "POST",
//         body: formData, // Send FormData directly
//       },
//       false // Don't require auth for registration
//     );

//     // Store tokens after successful registration
//     await this.storeTokens({
//       accessToken: response.data.accessToken,
//       refreshToken: response.data.refreshToken,
//     });

//     return response.data;
//   }

//   async logout(): Promise<void> {
//     try {
//       // Call logout endpoint if tokens exist
//       if (this.refreshToken) {
//         await this.request("/auth/logout", {
//           method: "POST",
//           body: JSON.stringify({ refreshToken: this.refreshToken }),
//         });
//       }
//     } catch (error) {
//       // Continue with logout even if API call fails
//       console.error("Logout API call failed:", error);
//     } finally {
//       // Always clear local tokens
//       await this.clearTokens();
//     }
//   }

//   // User Profile methods
//   async getProfile(): Promise<UserProfile> {
//     const response = await this.request<UserProfile>("/user/profile");
//     return response.data;
//   }

//   async updateProfile(data: {
//     name?: string;
//     bio?: string;
//   }): Promise<UserProfile> {
//     const response = await this.request<UserProfile>("/user/profile", {
//       method: "PUT",
//       body: JSON.stringify(data),
//     });
//     return response.data;
//   }

//   async uploadAvatar(imageUri: string): Promise<UserProfile> {
//     const formData = new FormData();
//     formData.append("avatar", {
//       uri: imageUri,
//       type: "image/jpeg",
//       name: "avatar.jpg",
//     } as any);

//     const response = await this.request<UserProfile>("/user/profile/avatar", {
//       method: "POST",
//       body: formData,
//     });
//     return response.data;
//   }

//   async deleteAvatar(): Promise<UserProfile> {
//     const response = await this.request<UserProfile>("/user/profile/avatar", {
//       method: "DELETE",
//     });
//     return response.data;
//   }

//   async updateOnlineStatus(isOnline: boolean): Promise<void> {
//     await this.request("/user/profile/status", {
//       method: "PATCH",
//       body: JSON.stringify({ isOnline }),
//     });
//   }

//   async changePassword(
//     currentPassword: string,
//     newPassword: string
//   ): Promise<void> {
//     await this.request("/user/profile/password", {
//       method: "PUT",
//       body: JSON.stringify({ currentPassword, newPassword }),
//     });
//   }

//   // Utility methods
//   isAuthenticated(): boolean {
//     return !!this.accessToken;
//   }

//   getAccessToken(): string | null {
//     return this.accessToken;
//   }

//   getApiUrl(): string {
//     return this.baseURL;
//   }
// }

// // Custom error class
// export class ApiError extends Error {
//   constructor(message: string, public status: number, public code?: string) {
//     super(message);
//     this.name = "ApiError";
//   }
// }

// export const apiService = new ApiService();


import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

// Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiErrorData {
  message: string;
  status: number;
  code?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  isOnline: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  stats: {
    messageCount: number;
    activeDevices: number;
  };
}

// Constants
const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl || "http://localhost:3001/api";
const TOKEN_STORAGE_KEY = "auth_tokens";

// Enhanced logging utility
class Logger {
  private static isDev = __DEV__;

  static logRequest(method: string, url: string, headers: any, body: any) {
    if (!this.isDev) return;

    console.group(`🚀 API REQUEST - ${method} ${url}`);
    console.log("📋 Headers:", JSON.stringify(headers, null, 2));

    if (body instanceof FormData) {
      console.log("📦 Body Type: FormData");
      console.log("📦 FormData entries:");
      // Log FormData entries (be careful with file content)
      for (let [key, value] of body.entries()) {
        if (value instanceof File || (value as any).uri) {
          console.log(`  ${key}:`, {
            name: (value as any).name || "unknown",
            type: (value as any).type || "unknown",
            size: (value as any).size || "unknown",
            uri: (value as any).uri ? "[URI Present]" : "[No URI]",
          });
        } else {
          console.log(`  ${key}:`, value);
        }
      }
    } else if (body) {
      console.log(
        "📦 Body:",
        typeof body === "string" ? JSON.parse(body) : body
      );
    } else {
      console.log("📦 Body: None");
    }
    console.groupEnd();
  }

  static logResponse(
    method: string,
    url: string,
    status: number,
    response: any,
    duration: number
  ) {
    if (!this.isDev) return;

    const emoji = status >= 200 && status < 300 ? "✅" : "❌";
    console.group(`${emoji} API RESPONSE - ${method} ${url} (${duration}ms)`);
    console.log("📊 Status:", status);
    console.log("📄 Response:", response);
    console.groupEnd();
  }

  static logError(method: string, url: string, error: any, duration: number) {
    if (!this.isDev) return;

    console.group(`💥 API ERROR - ${method} ${url} (${duration}ms)`);
    console.error("Error:", error);
    console.groupEnd();
  }
}

class ApiService {
  private baseURL: string;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private isRefreshing = false;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.initializeTokens();
    console.log("🔧 API Service initialized with base URL:", this.baseURL);
  }

  // Initialize tokens from secure storage
  private async initializeTokens() {
    try {
      const tokensString = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
      if (tokensString) {
        const tokens: AuthTokens = JSON.parse(tokensString);
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
        console.log("🔑 Tokens loaded from secure storage");
      } else {
        console.log("🔑 No stored tokens found");
      }
    } catch (error) {
      console.error("Failed to initialize tokens:", error);
    }
  }

  // Store tokens securely
  private async storeTokens(tokens: AuthTokens) {
    try {
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;
      console.log("🔑 Tokens stored successfully");
    } catch (error) {
      console.error("Failed to store tokens:", error);
      throw new ApiError(
        "Failed to store authentication tokens",
        0,
        "STORAGE_ERROR"
      );
    }
  }

  // Clear tokens
  private async clearTokens() {
    try {
      await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
      this.accessToken = null;
      this.refreshToken = null;
      console.log("🔑 Tokens cleared");
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  }

  // Main request method with enhanced logging
  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth = true
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const startTime = Date.now();
    const method = options.method || "GET";

    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    // Don't set Content-Type for FormData (let browser set it with boundary)
    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (requiresAuth && this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    // Log the request
    // Logger.logRequest(method, url, headers, options.body);

    try {
      const response = await fetch(url, config);
      const duration = Date.now() - startTime;

      let responseData;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      // Log successful response
      // Logger.logResponse(method, url, response.status, responseData, duration);

      if (!response.ok) {
        throw new ApiError(
          responseData.message || responseData || "Request failed",
          response.status,
          responseData.code
        );
      }

      return responseData;
    } catch (error) {
      const duration = Date.now() - startTime;
      Logger.logError(method, url, error, duration);

      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0,
        "NETWORK_ERROR"
      );
    }
  }

  // Public API methods

  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log("🔐 Attempting login for:", email);

    const response = await this.request<LoginResponse>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ username: email, password }),
      },
      false // Don't require auth for login
    );
    
    if (!response?.data?.accessToken || !response?.data?.refreshToken) {
      throw new ApiError("Invalid credentials", 401, "INVALID_LOGIN");
    }
  
    // Store tokens after successful login
    await this.storeTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });

    console.log("✅ Login successful for user:", response.data.username);
    return response.data;
  }

  async register(formData: FormData): Promise<LoginResponse> {
    console.log("📝 Attempting registration...");

    // Log FormData contents for debugging
    console.group("📋 Registration FormData Contents:");
    for (let [key, value] of formData.entries()) {
      if (value instanceof File || (value as any).uri) {
        console.log(`${key}:`, {
          name: (value as any).name || "unknown",
          type: (value as any).type || "unknown",
          size: (value as any).size || "unknown",
          uri: (value as any).uri ? "[URI Present]" : "[No URI]",
        });
      } else {
        console.log(`${key}:`, value);
      }
    }
    console.groupEnd();

    const response = await this.request<LoginResponse>(
      "/auth/create",
      {
        method: "POST",
        body: formData,
      },
      false // Don't require auth for registration
    );

    // Store tokens after successful registration
    await this.storeTokens({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    });

    console.log("✅ Registration successful for user:", response.data.username);
    return response.data;
  }

  async logout(): Promise<void> {
    console.log("🚪 Attempting logout...");

    try {
      // Call logout endpoint if tokens exist
      if (this.refreshToken) {
        await this.request("/auth/logout", {
          method: "POST",
          body: JSON.stringify({ refreshToken: this.refreshToken }),
        });
      }
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear local tokens
      await this.clearTokens();
      console.log("✅ Logout completed");
    }
  }

  // User Profile methods
  async getProfile(): Promise<UserProfile> {
    console.log("👤 Fetching user profile...");
    const response = await this.request<UserProfile>("/user/profile");
    return response.data;
  }

  async updateProfile(data: {
    name?: string;
    bio?: string;
  }): Promise<UserProfile> {
    console.log("✏️ Updating profile:", data);
    const response = await this.request<UserProfile>("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response.data;
  }

  async uploadAvatar(imageUri: string): Promise<UserProfile> {
    console.log("🖼️ Uploading avatar from:", imageUri);

    const formData = new FormData();
    formData.append("avatar", {
      uri: imageUri,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any);

    const response = await this.request<UserProfile>("/user/profile/avatar", {
      method: "POST",
      body: formData,
    });
    return response.data;
  }

  async deleteAvatar(): Promise<UserProfile> {
    console.log("🗑️ Deleting avatar...");
    const response = await this.request<UserProfile>("/user/profile/avatar", {
      method: "DELETE",
    });
    return response.data;
  }

  async updateOnlineStatus(isOnline: boolean): Promise<void> {
    console.log("🟢 Updating online status to:", isOnline);
    await this.request("/user/profile/status", {
      method: "PATCH",
      body: JSON.stringify({ isOnline }),
    });
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    console.log("🔒 Changing password...");
    await this.request("/user/profile/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Utility methods
  isAuthenticated(): boolean {
    const authenticated = !!this.accessToken;
    console.log("🔍 Authentication status:", authenticated);
    return authenticated;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  getApiUrl(): string {
    return this.baseURL;
  }
}

// Custom error class
export class ApiError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiService = new ApiService();