"use client";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "@/store/auth";
// import { useAuthStore } from "../../store/mockAuth";

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // router.replace("/");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Push Notifications</Text>
              <Text style={styles.settingSubtext}>
                Receive notifications on your device
              </Text>
            </View>
          </View>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
            trackColor={{ false: "#ccc", true: "#007AFF" }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="mail-outline" size={24} color="#666" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Email Notifications</Text>
              <Text style={styles.settingSubtext}>
                Receive updates via email
              </Text>
            </View>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: "#ccc", true: "#007AFF" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={24} color="#666" />
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Dark Mode</Text>
              <Text style={styles.settingSubtext}>Use dark theme</Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#ccc", true: "#007AFF" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="eye-off-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Privacy Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Two-Factor Authentication</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="download-outline" size={24} color="#666" />
          <Text style={styles.menuText}>Export Data</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, styles.dangerItem]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#ff4444" />
          <Text style={[styles.menuText, styles.dangerText]}>Sign Out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.dangerItem]}>
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
          <Text style={[styles.menuText, styles.dangerText]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  settingSubtext: {
    fontSize: 14,
    color: "#666",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  dangerItem: {
    backgroundColor: "#fff5f5",
  },
  dangerText: {
    color: "#ff4444",
  },
});
