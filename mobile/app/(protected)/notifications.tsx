import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "message" | "system" | "update";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Message",
    message: "Alice sent you a message in the chat room",
    timestamp: "2 minutes ago",
    read: false,
    type: "message",
  },
  {
    id: "2",
    title: "System Update",
    message: "App has been updated to version 1.2.0",
    timestamp: "1 hour ago",
    read: true,
    type: "system",
  },
  {
    id: "3",
    title: "Welcome!",
    message: "Welcome to our chat app! Start connecting with others.",
    timestamp: "2 days ago",
    read: true,
    type: "update",
  },
];

export default function NotificationsScreen() {
  const getIconName = (type: string) => {
    switch (type) {
      case "message":
        return "chatbubble-outline";
      case "system":
        return "settings-outline";
      case "update":
        return "information-circle-outline";
      default:
        return "notifications-outline";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "message":
        return "#007AFF";
      case "system":
        return "#ff9500";
      case "update":
        return "#34c759";
      default:
        return "#666";
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadItem]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(item.type) as any}
          size={24}
          color={getIconColor(item.type)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, !item.read && styles.unreadTitle]}>
          {item.title}
        </Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>
              You'll see your notifications here
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  notificationItem: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  unreadItem: {
    backgroundColor: "#f8f9ff",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 18,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
