export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  senderName: string;
  timestamp: number;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
}
