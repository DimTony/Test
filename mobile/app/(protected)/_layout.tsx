"use client";

import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useAuthStore } from "../../store/auth";

export default function ProtectedLayout() {
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    // Only redirect if auth is initialized and no user
    if (isInitialized && !user) {
      router.replace("/");
    }
  }, [user, isInitialized]);

  // Don't render protected content if no user
  if (!user) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
