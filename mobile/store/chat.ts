import { create } from "zustand";
import io, { type Socket } from "socket.io-client";
import Constants from "expo-constants";
import { apiService } from "@/lib/api";
// import { apiService } from "../lib/api-service";

export interface Message {
  id: string;
  content: string;
  userId: string;
  senderName: string;
  timestamp: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  lastMessage?: {
    content: string;
    timestamp: string;
    senderName: string;
  };
}

interface ChatState {
  messages: Message[];
  rooms: ChatRoom[];
  currentRoomId: string | null;
  isConnected: boolean;
  socket: Socket | null;
  isLoading: boolean;

  // Actions
  initializeSocket: () => void;
  disconnectSocket: () => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (content: string, roomId: string) => void;
  loadMessages: (roomId: string, page?: number) => Promise<void>;
  loadRooms: () => Promise<void>;
  clearMessages: () => void;
}

const SOCKET_URL =
  Constants.expoConfig?.extra?.socketUrl || "http://localhost:3001";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  rooms: [],
  currentRoomId: null,
  isConnected: false,
  socket: null,
  isLoading: false,

  initializeSocket: () => {
    const accessToken = apiService.getAccessToken();
    if (!accessToken) {
      console.error("No access token available for socket connection");
      return;
    }

    // Disconnect existing socket if any
    const { socket: existingSocket } = get();
    if (existingSocket) {
      existingSocket.disconnect();
    }

    const socket = io(SOCKET_URL, {
      auth: { token: accessToken },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to socket server");
      set({ isConnected: true });
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
      set({ isConnected: false });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      set({ isConnected: false });
    });

    socket.on("new-message", (message: Message) => {
      const { currentRoomId } = get();
      // Only add message if it's for the current room
      if (message.userId !== currentRoomId) return;

      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    socket.on("user-joined", (data: { userId: string; userName: string }) => {
      console.log(`${data.userName} joined the room`);
    });

    socket.on("user-left", (data: { userId: string; userName: string }) => {
      console.log(`${data.userName} left the room`);
    });

    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error.message);
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({
        socket: null,
        isConnected: false,
        currentRoomId: null,
      });
    }
  },

  joinRoom: (roomId: string) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("join-room", roomId);
      set({ currentRoomId: roomId });

      // Load messages for this room
      get().loadMessages(roomId);
    }
  },

  leaveRoom: (roomId: string) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("leave-room", roomId);
    }
    set({ currentRoomId: null, messages: [] });
  },

  sendMessage: (content: string, roomId: string) => {
    const { socket } = get();
    if (socket?.connected) {
      socket.emit("send-message", { content, roomId });
    }
  },

  loadMessages: async (roomId: string, page = 1) => {
    set({ isLoading: true });
    try {
      const response = await apiService.getMessages(roomId, page);

      if (page === 1) {
        // First page - replace messages
        set({ messages: response.messages });
      } else {
        // Additional pages - prepend messages
        set((state) => ({
          messages: [...response.messages, ...state.messages],
        }));
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadRooms: async () => {
    set({ isLoading: true });
    try {
      const rooms = await apiService.getChatRooms();
      set({ rooms });
    } catch (error) {
      console.error("Failed to load chat rooms:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearMessages: () => {
    set({ messages: [] });
  },
}));
