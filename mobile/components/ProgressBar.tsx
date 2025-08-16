import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import * as Progress from "react-native-progress";
import { format } from "date-fns";

interface SubscriptionProgressProps {
  startDate: string; // ISO string
  endDate: string; // ISO string
}

const SubscriptionProgress: React.FC<SubscriptionProgressProps> = ({
  startDate,
  endDate,
}) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalDays = Math.max(
    1,
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  );
  const remainingDays = Math.max(
    0,
    Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );
  const progress = Math.min(1, Math.max(0, 1 - remainingDays / totalDays));

  // Determine glow color
  let color = "#28a745"; // green
  if (progress <= 0.33) color = "#FF3B30"; // red
  else if (progress <= 0.66) color = "#FFD700"; // yellow

  return (
    <View style={styles.wrapper}>
      <View style={[styles.glowContainer, getGlowStyle(color)]}>
        <Progress.Bar
          progress={progress}
          width={null}
          height={10}
          borderRadius={8}
          color={color}
          unfilledColor="#e0e0e0"
          borderWidth={0}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 11, fontWeight: 700 }}>
          {remainingDays} day{remainingDays !== 1 ? "s" : ""} left
        </Text>
        <Text style={{ fontSize: 11, fontWeight: 700 }}>
          Due by: {format(end, "dd MMM yyyy")}
        </Text>
      </View>
    </View>
  );
};

const getGlowStyle = (color: string) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
  elevation: Platform.OS === "android" ? 8 : 0,
});

const styles = StyleSheet.create({
  wrapper: {
    // paddingHorizontal: 20,
    marginVertical: 16,
  },
  glowContainer: {
    borderRadius: 10,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default SubscriptionProgress;
