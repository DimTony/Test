import { TextStyle } from "react-native";

export const statusTextStyles: Record<
  "active" | "queued" | "pending" | "expired",
  TextStyle
> = {
  active: {
    color: "#00C851", // Flat green
    fontWeight: "600",
    fontSize: 14,
  },
  queued: {
    color: "#FFBB33", // Flat yellow-orange
    fontWeight: "600",
    fontSize: 14,
  },
  pending: {
    color: "#FFBB33", // Flat yellow-orange
    fontWeight: "600",
    fontSize: 14,
  },
  expired: {
    color: "#ff4444", // Flat red
    fontWeight: "600",
    fontSize: 14,
  },
};
