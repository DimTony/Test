import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type StatusType = "active" | "queued" | "pending" | "expired";

interface StatusDotProps {
  status: StatusType;
}

const StatusDot: React.FC<StatusDotProps> = ({ status }) => {
  return <View style={[styles.dot, statusStyles[status]]} />;
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
  },
});

const glow = (color: string): ViewStyle => ({
  backgroundColor: color,
  shadowColor: color,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.9,
  shadowRadius: 6,
  elevation: 5,
});

const statusStyles: Record<StatusType, ViewStyle> = {
  active: glow("#00FF00"), // Green
  queued: glow("#FFD700"), // Yellow
  pending: glow("#FFD700"), // Yellow
  expired: glow("#FF3B30"), // Red
};

export default StatusDot;
