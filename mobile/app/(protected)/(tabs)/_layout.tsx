"use client";

import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint="light" // or "dark"
            intensity={50}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              overflow: "hidden",
            }}
          />
        ),
        // tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "#cccccc",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="defender"
        options={{
          title: "Defender",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="chatbubbles" size={size} color={color} />
            <FontAwesome5 name="shield-virus" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
