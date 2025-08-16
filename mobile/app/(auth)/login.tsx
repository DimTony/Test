"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuthStore } from "../../store/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Only redirect on successful login
      router.replace("/(protected)/dashboard");
    } catch (error) {
      // Stay on login page and show error
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.";
      Alert.alert("Login Failed", errorMessage);
      // Don't redirect - stay on login page
    } finally {
      setLoading(false);
    }
  };

  return (
     <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
            >
              <View style={styles.titleHeader}>
                <LottieView
                  source={require("../../assets/animations/loadfour.json")}
                  autoPlay
                  loop
                  style={styles.animation}
                />
                <Text style={styles.title}>Welcome</Text>
              </View>
    
              <View style={{ backgroundColor: "#f3f3f3", paddingHorizontal: 24 }}>
                <>
                  <View style={{ gap: 20, backgroundColor: "#f3f3f3" }}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />
                  </View>
    
                  <View
                    style={{
                      backgroundColor: "#f3f3f3",
                      alignItems: "flex-end",
                      marginTop: 10,
                      marginBottom: 20,
                    }}
                  >
                    <TouchableOpacity>
                      <Text>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
    
                  <TouchableOpacity
                    style={[styles.submitButton, loading && styles.disabledButton]}
                    onPress={handleLogin}
                    disabled={loading}
                  >
                    <Text
                      style={[
                        styles.submitButtonText,
                        loading && styles.disabledButtonText,
                      ]}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Text>
                  </TouchableOpacity>
                </>
              </View>
    
              <View
                style={{
                  backgroundColor: "#f3f3f3",
                  paddingHorizontal: 24,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 40,
                }}
              >
                <View
                  style={{ height: 1, width: "40%", backgroundColor: "#ccc" }}
                />
                <Text style={{ color: "#888" }}>Or</Text>
                <View
                  style={{ height: 1, width: "40%", backgroundColor: "#ccc" }}
                />
              </View>
    
              <View style={styles.linkContainer}>
                <Text style={styles.linkText}>Don't have an account? </Text>
                <Link href="/(auth)/signup" style={styles.link}>
                  <Text style={styles.linkTextBold}>Get Started</Text>
                </Link>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },
  titleHeader: {
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    marginBottom: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: "#f3f3f3",
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  animation: {
    width: 200,
    height: 150,
  },
  inputGroup: {
    backgroundColor: "#f3f3f3",
  },
  inputContainer: {
    backgroundColor: "#f3f3f3",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  inputError: {
    borderColor: "#F44336",
    borderWidth: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
    backgroundColor: "#f3f3f3",
  },
  requiredStar: {
    color: "#FF3B30",
    marginLeft: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#ff4444",
    marginTop: 4,
  },
  validationSummary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  validationSummaryText: {
    color: "#F57C00",
    fontSize: 14,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#87CEEB",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
  },
  disabledButton: {
    backgroundColor: "#eaeaea",
  },
  disabledButtonText: {
    color: "#999",
  },
  modalContent: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#666",
  },
  link: {
    color: "#007AFF",
  },
  linkTextBold: {
    color: "#87CEEB",
    fontWeight: "600",
  },
});
