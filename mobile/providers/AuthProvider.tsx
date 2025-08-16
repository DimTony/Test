"use client";

import type React from "react";
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuthStore } from "../store/auth";
import { useChatStore } from "../store/chat";
import LottieView from "lottie-react-native";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initializeAuth, isInitialized, isLoading, user } = useAuthStore();
  const { initializeSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    // Initialize socket when user logs in
    if (user) {
      initializeSocket();
    } else {
      // Disconnect socket when user logs out
      disconnectSocket();
    }

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [user]);

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        {/* <ActivityIndicator size="large" color="#87CEEB" /> */}
        <LottieView
          source={require("../assets/animations/loadthree.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  animation: {
    width: 200,
    height: 200,
  },
});
