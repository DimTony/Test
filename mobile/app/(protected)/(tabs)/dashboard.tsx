import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
// import { useAuthStore } from "../../../store/mockAuth";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "@/components/SearchBar";
import {
  EvilIcons,
  Feather,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import ToggleSwitch from "@/components/ToggleSwitch";

export default function DashboardScreen() {
  const { user, logout } = useAuthStore();
  const insets = useSafeAreaInsets();
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // useEffect(() => {console.log('ffff', user)}, [user])

  const handleToggle = useCallback((value: boolean) => {
    setIsEnabled(value);
    // console.log("Toggle state:", value);
  }, []);

  const handleLogout = () => {
    logout();
    // router.replace("/");
    // router.dismissAll();
  };

  const status: "Needs Attention" | "Critical" | "Healthy" = "Critical";

  return (
    <View
      style={[
        styles.container,
        {
          // paddingTop: insets.top,
        },
      ]}
    >
      <ImageBackground
        source={
          require("../../../assets/images/defBack.jpg")
          // uri: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        }
        resizeMode="cover"
        style={[
          styles.background,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          >
            {/* <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
       
      </View> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 24,
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/(protected)/profile")}
                >
                  <Image
                    source={require("../../../assets/images/avatar1.png")}
                    style={{ width: 40, height: 40, borderRadius: "100%" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 24 }}>CRS Defender</Text> */}
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Text
                    style={[
                      styles.welcomeText,
                      {
                        color: "#fff",
                        fontWeight: "bold",
                        fontFamily: "Poppins_400Regular",
                      },
                    ]}
                  >
                    Welcome,
                  </Text>
                  <Text
                    style={[
                      styles.welcomeText,
                      {
                        color: "#87ceeb",
                        fontWeight: "400",
                        fontFamily: "Lobster_400Regular",
                      },
                    ]}
                  >
                    {user?.username}!
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 20 }}>
              <SearchBar
                isFocused={isSearchBarFocused}
                setIsFocused={setIsSearchBarFocused}
              />
            </View>

            <View
              style={{
                paddingHorizontal: 24,
                marginVertical: 24,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity style={{ width: "30%", maxHeight: 100 }}>
                <View style={[styles.card, styles.shadowProp]}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#87CEEB",
                      borderRadius: "100%",
                      padding: 12,
                    }}
                  >
                    <Feather name="phone-call" size={24} color="#87CEEB" />
                  </View>
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    Secure Calls
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: "30%", maxHeight: 100 }}>
                <View style={[styles.card, styles.shadowProp]}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#87CEEB",
                      borderRadius: "100%",
                      padding: 12,
                      backgroundColor: "#87CEEB",
                    }}
                  >
                    <Fontisto name="hipchat" size={24} color="#ffffff" />
                  </View>
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    E2E Chats
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: "30%", maxHeight: 100 }}>
                <View style={[styles.card, styles.shadowProp]}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#87CEEB",
                      borderRadius: "100%",
                      padding: 8,
                    }}
                  >
                    <MaterialIcons
                      name="video-call"
                      size={32}
                      color="#87CEEB"
                    />
                  </View>
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    Video Calls
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 24,
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "55%", gap: 20 }}>
                <TouchableOpacity style={{ width: "100%", maxHeight: 80 }}>
                  <View style={[styles.challengeCard, styles.shadowProp]}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: "#87CEEB",
                        borderRadius: "100%",
                        padding: 12,
                        backgroundColor: "#87CEEB",
                      }}
                    >
                      <Feather name="phone-call" size={18} color="#ffffff" />
                    </View>
                    <View
                      style={{
                        height: "100%",
                        justifyContent: "space-between",
                        width: "65%",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "gray",
                          borderBottomWidth: 2,
                          paddingBottom: 4,
                          borderColor: "#87CEEB",
                          width: "100%",
                        }}
                      >
                        Challenges
                      </Text>
                      <Text style={{ fontWeight: "500", color: "gray" }}>
                        Call Driver
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ width: "100%", maxHeight: 55 }}
                  disabled={true}
                >
                  <View style={[styles.padlessCard, styles.shadowProp]}>
                    <ToggleSwitch
                      isEnabled={isEnabled}
                      onToggle={handleToggle}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ maxHeight: 155, width: "40%" }}>
                <TouchableOpacity style={{ width: "100%" }}>
                  <View style={[styles.card, styles.shadowProp]}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: "red",
                        borderRadius: "100%",
                        padding: 12,
                        backgroundColor: "#FF3B30",
                      }}
                    >
                      <MaterialIcons
                        name="lock-reset"
                        size={24}
                        color="#ffffff"
                      />
                    </View>
                    <Text style={{ fontWeight: "500", color: "gray" }}>
                      Hard Reset
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 24, marginTop: 24, height: 155 }}>
              {/* <TouchableOpacity style={{ width: "100%", maxHeight: 150 }}> */}
              <View
                style={[
                  styles.card,
                  styles.shadowProp,
                  { flexDirection: "row", gap: 32 },
                ]}
              >
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/images/vault.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: 14,
                      width: 65,
                      fontWeight: "500",
                      color: "gray",
                    }}
                  >
                    File Drive
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/images/group.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    Meeting Rooms
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../../assets/images/screen.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                  <Text style={{ fontWeight: "500", color: "gray" }}>
                    Secure Calls
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              style={{ paddingHorizontal: 24, marginTop: 24, height: 150 }}
            >
              {/* <TouchableOpacity style={{ width: "30%", maxHeight: 100 }}> */}
              <View
                style={[
                  styles.card,
                  styles.shadowProp,
                  {
                    paddingHorizontal: 14,
                    paddingVertical: 14,
                    justifyContent: "space-between",
                  },
                ]}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <Text
                    style={{ fontWeight: "500", color: "#000", fontSize: 16 }}
                  >
                    Device Health
                  </Text>

                  <Image
                    // source={require(`../../assets/images/${
                    //   status === ("bad" as any)
                    //     ? "badHealth"
                    //     : status === ("good" as any)
                    //     ? "goodHealth"
                    //     : "warnHealth"
                    // }.png`)}
                    source={require(`../../../assets/images/${
                      status === ("Critical" as any)
                        ? "badHealth"
                        : status === ("Healthy" as any)
                        ? "goodHealth"
                        : "warnHealth"
                    }.png`)}
                    // source={require(`../../../assets/images/goodHealth.png`)}
                    style={{
                      width: 60,
                      height: 60,
                      position: "absolute",
                      right: "0%",
                      top: "10%",
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <View style={{ gap: 2 }}>
                    <Text
                      style={{ fontWeight: "400", color: "#888", fontSize: 12 }}
                    >
                      Update is available
                    </Text>
                    <View style={{ flexDirection: "row", gap: 4 }}>
                      <Text
                        style={{
                          fontWeight: "400",
                          color: "#000",
                          fontSize: 12,
                        }}
                      >
                        Status:
                      </Text>
                      <Text
                        style={{
                          fontWeight: "400",
                          // color: status === "bad" as any ? "#FF3B30" : "#888",
                          color:
                            status === ("Critical" as any)
                              ? "#FF3B30"
                              : status === ("Healthy" as any)
                              ? "#0F9D58"
                              : "#FFA500",
                          fontSize: 12,
                        }}
                      >
                        {status}
                      </Text>
                    </View>
                  </View>

                  <EvilIcons name="chevron-right" size={24} color="black" />
                </View>
              </View>
              {/* </TouchableOpacity> */}
            </TouchableOpacity>

            {/* <View style={styles.welcomeCard}>
            <Text style={styles.welcomeText}>Welcome, {user?.username}!</Text>
            
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/(protected)/(tabs)/chat")}
            >
              <Text style={styles.actionButtonText}>Go to Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => router.push("/(protected)/profile")}
            >
              <Text
                style={[styles.actionButtonText, styles.secondaryButtonText]}
              >
                View Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => router.push("/(protected)/settings")}
            >
              <Text
                style={[styles.actionButtonText, styles.secondaryButtonText]}
              >
                Settings
              </Text>
            </TouchableOpacity>
          </View> */}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  background: {
    flex: 1,
    width: "100%",
    // height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
  },
  welcomeCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#007AFF",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 16,
    width: "100%",
    height: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  padlessCard: {
    backgroundColor: "white",
    borderRadius: 16,
    width: "100%",
    height: "100%",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  challengeCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 14,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
