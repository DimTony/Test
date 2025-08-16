"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuthStore } from "@/store/auth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
  MobileV4BasicIcon,
  MobileV4PremiumIcon,
  MobileV4EnterpriseIcon,
  MobileV5BasicIcon,
  MobileV5PremiumIcon,
  FullSuiteBasicIcon,
  FullSuitePremiumIcon,
} from "@/components/SvgIcons";

interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size?: number;
}

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("h@c.v");
  const [username, setUsername] = useState("jarrad");
  const [password, setPassword] = useState("password");
  const [confirmPassword, setConfirmPassword] = useState("password");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [deviceName, setDeviceName] = useState("sed");
  const [imei, setImei] = useState("098765432112345");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const { signup } = useAuthStore();

  const subscriptionPlans: any[] = [
    {
      id: 1,
      label: "Mobile Only v4 - Basic (30 days)",
      duration: 30,
      description: "Basic mobile encryption for 30 days",
      price: "$9.99",
      icon: MobileV4BasicIcon,
      value: "mobile-v4-basic",
    },
    {
      id: 2,
      label: "Mobile Only v4 - Premium (60 days)",
      duration: 60,
      description: "Premium mobile encryption for 60 days",
      price: "$18.99",
      icon: MobileV4PremiumIcon,
      value: "mobile-v4-premium",
    },
    {
      id: 3,
      label: "Mobile Only v4 - Enterprise (90 days)",
      duration: 90,
      description: "Enterprise mobile encryption for 90 days",
      price: "$27.99",
      icon: MobileV4EnterpriseIcon,
      value: "mobile-v4-enterprise",
    },
    {
      id: 4,
      label: "Mobile Only v5 - Basic (30 days)",
      duration: 30,
      description: "Latest v5 mobile encryption for 30 days",
      price: "$35.99",
      icon: MobileV5BasicIcon,
      value: "mobile-v5-basic",
    },
    {
      id: 5,
      label: "Mobile Only v5 - Premium (60 days)",
      duration: 60,
      description: "Latest v5 mobile encryption for 60 days",
      price: "$35.99",
      icon: MobileV5PremiumIcon,
      value: "mobile-v5-premium",
    },
    {
      id: 6,
      label: "Full Suite - Basic (60 days)",
      duration: 60,
      description: "Basic encryption suite for 60 days",
      price: "$35.99",
      icon: FullSuiteBasicIcon,
      value: "full-suite-basic",
    },
    {
      id: 7,
      label: "Full Suite - Premium (90 days)",
      duration: 90,
      description: "Complete encryption suite for 90 days",
      price: "$35.99",
      icon: FullSuitePremiumIcon,
      value: "full-suite-premium",
    },
  ];

  const handlePlanSelection = (planValue: string) => {
    setSelectedPlan(planValue);
  };

  const pickFiles = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted" || cameraPermission.status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please grant permission to access your photos and camera"
      );
      return;
    }

    Alert.alert("Upload Files", "Choose a method", [
      {
        text: "Take Photo",
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use correct MediaTypeOptions
            quality: 0.7,
            base64: true,
            allowsMultipleSelection: true,
          });

          if (!result.canceled && result.assets?.length > 0) {
            const newFiles = result.assets.map((asset, index) => ({
              uri: asset.uri,
              base64: asset.base64 ?? "",
              name: `file_${Date.now()}_${index}.jpg`,
              type: "image/jpeg",
              size: asset.fileSize,
            }));
            setSelectedFiles((prev) => [...prev, ...newFiles]);
          } else {
            Alert.alert("Error", "Failed to capture files");
          }
        },
      },
      {
        text: "Choose from Gallery",
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use correct MediaTypeOptions
            quality: 0.7,
            base64: true,
            allowsMultipleSelection: true,
          });

          if (!result.canceled && result.assets?.length > 0) {
            const newFiles = result.assets.map((asset, index) => ({
              uri: asset.uri,
              base64: asset.base64 ?? "",
              name: `file_${Date.now()}_${index}.jpg`,
              type: "image/jpeg",
              size: asset.fileSize,
            }));
            setSelectedFiles((prev) => [...prev, ...newFiles]);
          } else {
            Alert.alert("Error", "Failed to select files");
          }
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  // Replace the pickFromCamera function
  const pickFromCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Camera permission is required to take photos"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use correct MediaTypeOptions
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const newFile: SelectedFile = {
          uri: asset.uri,
          name: `camera_${Date.now()}.jpg`,
          type: "image/jpeg",
          size: asset.fileSize,
        };
        addFile(newFile);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  // Replace the pickFromGallery function
  const pickFromGallery = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Gallery permission is required to select photos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Use correct MediaTypeOptions
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: 10 - selectedFiles.length,
      });

      if (!result.canceled) {
        const newFiles: SelectedFile[] = result.assets.map((asset, index) => ({
          uri: asset.uri,
          name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
          type: asset.type || "image/jpeg",
          size: asset.fileSize,
        }));
        addFiles(newFiles);
      }
    } catch (error) {
      console.error("Error picking from gallery:", error);
      Alert.alert("Error", "Failed to select images");
    }
  };

  // COMPLETELY REPLACE the handleSignup function with this version that matches your backend
  const handleSignup = async () => {
    console.log("🚀 Starting signup process...");

    // Validation
    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !deviceName ||
      !imei
    ) {
      console.log("❌ Validation failed: Missing required fields");
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      console.log("❌ Validation failed: Passwords do not match");
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      console.log("❌ Validation failed: Password too short");
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (!selectedPlan) {
      console.log("❌ Validation failed: No subscription plan selected");
      Alert.alert("Error", "Please select a subscription plan");
      return;
    }

    if (selectedFiles.length === 0) {
      console.log("❌ Validation failed: No files uploaded");
      Alert.alert("Error", "Please upload at least one encryption card");
      return;
    }

    console.log("✅ All validations passed");
    console.log("📋 Signup data:", {
      username,
      email,
      phoneNumber,
      deviceName,
      imei,
      selectedPlan,
      filesCount: selectedFiles.length,
    });

    setLoading(true);
    try {
      // Create FormData for multipart upload
      const formData = new FormData();

      // Add user data with exact field names your backend expects
      formData.append("name", username); // Backend might expect 'name' instead of 'username'
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      // formData.append("phone", phoneNumber); // Backend might expect 'phone' instead of 'phoneNumber'
      formData.append("phoneNumber", phoneNumber);
      formData.append("deviceName", deviceName);
      formData.append("imei", imei);
      formData.append("plan", selectedPlan);
      formData.append("subscription", selectedPlan); // Backend might expect 'subscription'

      console.log("📦 Adding files to FormData...");
      // Add files with different possible field names your backend might expect
      selectedFiles.forEach((file, index) => {
        console.log(`📎 Adding file ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          hasUri: !!file.uri,
        });

        // Try multiple field names that your backend might expect
        const fileData = {
          uri: file.uri,
          type: file.type,
          name: file.name,
        };

        formData.append("files", fileData as any); // Main files field
        // formData.append("encryptionCards", fileData as any); // Alternative field name
        // formData.append(`file${index}`, fileData as any); // Individual file fields
      });

      // Also add individual fields that your backend validation might be checking for
      // formData.append("termsAccepted", "true");
      // formData.append("deviceType", "mobile");

      console.log("🔄 Calling signup API...");
      console.log("📋 FormData summary:");
      for (let [key, value] of formData.entries()) {
        if (typeof value === "object" && value !== null && "uri" in value) {
          console.log(`  ${key}: [File object with URI]`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      // Call signup with FormData
      await signup(formData);

      console.log("✅ Signup successful, navigating to dashboard...");
      router.replace("/(protected)/dashboard");
    } catch (error: any) {
      console.error("💥 Signup error:", error);

      // More detailed error logging
      if (error.response) {
        console.error("📄 Error response:", error.response.data);
        console.error("📊 Error status:", error.response.status);
      }

      Alert.alert("Error", "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
      console.log("🏁 Signup process completed");
    }
  };

  // const pickFiles = async () => {
  //   try {
  //     Alert.alert(
  //       "Select Files",
  //       "Choose how you want to add files",
  //       [
  //         {
  //           text: "Camera",
  //           onPress: pickFromCamera,
  //         },
  //         {
  //           text: "Gallery",
  //           onPress: pickFromGallery,
  //         },
  //         {
  //           text: "Documents",
  //           onPress: pickFromDocuments,
  //         },
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //       ],
  //       { cancelable: true }
  //     );
  //   } catch (error) {
  //     console.error("Error picking files:", error);
  //     Alert.alert("Error", "Failed to open file picker");
  //   }
  // };

  // const pickFiles = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== "granted" || cameraPermission.status !== "granted") {
  //     Alert.alert(
  //       "Permission needed",
  //       "Please grant permission to access your photos and camera"
  //     );
  //     return;
  //   }

  //   Alert.alert("Upload Files", "Choose a method", [
  //     {
  //       text: "Take Photo",
  //       onPress: async () => {
  //         const result = await ImagePicker.launchCameraAsync({
  //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //           quality: 0.7,
  //           base64: true,
  //           allowsMultipleSelection: true,
  //         });

  //         if (!result.canceled && result.assets?.length > 0) {
  //           const newFiles = result.assets.map((asset, index) => ({
  //             uri: asset.uri,
  //             base64: asset.base64 ?? "",
  //             name: `file_${Date.now()}_${index}.jpg`,
  //             type: "image/jpeg",
  //           }));
  //           setSelectedFiles((prev) => [...prev, ...newFiles]);
  //         } else {
  //           Alert.alert("Error", "Failed to capture files");
  //         }
  //       },
  //     },
  //     {
  //       text: "Choose from Gallery",
  //       onPress: async () => {
  //         const result = await ImagePicker.launchImageLibraryAsync({
  //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //           quality: 0.7,
  //           base64: true,
  //           allowsMultipleSelection: true,
  //         });

  //         if (!result.canceled && result.assets?.length > 0) {
  //           const newFiles = result.assets.map((asset, index) => ({
  //             uri: asset.uri,
  //             base64: asset.base64 ?? "",
  //             name: `file_${Date.now()}_${index}.jpg`,
  //             type: "image/jpeg",
  //           }));
  //           setSelectedFiles((prev) => [...prev, ...newFiles]);
  //         } else {
  //           Alert.alert("Error", "Failed to select files");
  //         }
  //       },
  //     },
  //     { text: "Cancel", style: "cancel" },
  //   ]);
  // };

  // const pickFromCamera = async () => {
  //   try {
  //     const permissionResult =
  //       await ImagePicker.requestCameraPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       Alert.alert(
  //         "Permission Required",
  //         "Camera permission is required to take photos"
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 0.8,
  //     });

  //     if (!result.canceled && result.assets[0]) {
  //       const asset = result.assets[0];
  //       const newFile: SelectedFile = {
  //         uri: asset.uri,
  //         name: `camera_${Date.now()}.jpg`,
  //         type: "image/jpeg",
  //         size: asset.fileSize,
  //       };
  //       addFile(newFile);
  //     }
  //   } catch (error) {
  //     console.error("Error taking photo:", error);
  //     Alert.alert("Error", "Failed to take photo");
  //   }
  // };

  // const pickFromGallery = async () => {
  //   try {
  //     const permissionResult =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       Alert.alert(
  //         "Permission Required",
  //         "Gallery permission is required to select photos"
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsMultipleSelection: true,
  //       quality: 0.8,
  //       selectionLimit: 10 - selectedFiles.length,
  //     });

  //     if (!result.canceled) {
  //       const newFiles: SelectedFile[] = result.assets.map((asset, index) => ({
  //         uri: asset.uri,
  //         name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
  //         type: asset.type || "image/jpeg",
  //         size: asset.fileSize,
  //       }));
  //       addFiles(newFiles);
  //     }
  //   } catch (error) {
  //     console.error("Error picking from gallery:", error);
  //     Alert.alert("Error", "Failed to select images");
  //   }
  // };

  const pickFromDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const newFiles: SelectedFile[] = result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || "application/octet-stream",
          size: asset.size,
        }));
        addFiles(newFiles);
      }
    } catch (error) {
      console.error("Error picking documents:", error);
      Alert.alert("Error", "Failed to select documents");
    }
  };

  const addFile = (file: SelectedFile) => {
    if (selectedFiles.length >= 10) {
      Alert.alert("Limit Reached", "You can only upload up to 10 files");
      return;
    }
    setSelectedFiles((prev) => [...prev, file]);
  };

  const addFiles = (files: SelectedFile[]) => {
    const remainingSlots = 10 - selectedFiles.length;
    if (files.length > remainingSlots) {
      Alert.alert(
        "Limit Reached",
        `You can only add ${remainingSlots} more files`
      );
      const filesToAdd = files.slice(0, remainingSlots);
      setSelectedFiles((prev) => [...prev, ...filesToAdd]);
    } else {
      setSelectedFiles((prev) => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  

 

  const renderPlanCard = (plan: any) => {
    const isSelected = selectedPlan === plan.value;
    const IconComponent = plan.icon;

    return (
      <TouchableOpacity
        key={plan.id}
        style={[styles.planCard, isSelected && styles.planCardSelected]}
        onPress={() => handlePlanSelection(plan.value)}
        activeOpacity={0.7}
      >
        <View style={styles.planHeader}>
          <View style={styles.planIconContainer}>
            <IconComponent width={32} height={32} />
          </View>
          <View style={styles.radioButton}>
            {isSelected && <View style={styles.radioButtonSelected} />}
          </View>
        </View>

        <Text
          style={[styles.planTitle, isSelected && styles.planTitleSelected]}
        >
          {plan.label}
        </Text>
        <Text
          style={[
            styles.planDescription,
            isSelected && styles.planDescriptionSelected,
          ]}
        >
          {plan.description}
        </Text>
        <Text
          style={[styles.planPrice, isSelected && styles.planPriceSelected]}
        >
          {plan.price}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[{ right: "22%", fontSize: 24, fontWeight: "bold" }]}>
          Device Registration
        </Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Information</Text>

          <View style={{ gap: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Username *"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Email *"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number *"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Password (min 6 characters) *"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Information</Text>

          <View style={{ gap: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Device Name *"
              value={deviceName}
              onChangeText={setDeviceName}
            />

            <TextInput
              style={styles.input}
              placeholder="IMEI *"
              value={imei}
              onChangeText={setImei}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription Plan</Text>
          <Text style={styles.label}>Select Subscription Plan *</Text>

          <View style={styles.plansContainer}>
            {subscriptionPlans.map((plan) => renderPlanCard(plan))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Encryption Upload</Text>

          <TouchableOpacity style={styles.uploadArea} onPress={pickFiles}>
            <Ionicons name="cloud-upload-outline" size={48} color="#888" />
            <Text style={styles.uploadText}>Upload Encryption Cards</Text>
            <Text style={styles.uploadSubtext}>
              Support: JPG, PNG, PDF (Max 10MB each, up to 10 files)
            </Text>
            {selectedFiles.length > 0 && (
              <Text style={styles.fileCount}>
                {selectedFiles.length}/10 files selected
              </Text>
            )}
          </TouchableOpacity>

          {selectedFiles.length > 0 && (
            <View style={styles.filesContainer}>
              <Text style={styles.filesTitle}>Selected Files:</Text>
              {selectedFiles.map((file, index) => (
                <View key={index} style={styles.fileItem}>
                  <View style={styles.fileInfo}>
                    <Ionicons
                      name={
                        file.type.startsWith("image/")
                          ? "image-outline"
                          : "document-outline"
                      }
                      size={20}
                      color="#666"
                    />
                    <View style={styles.fileDetails}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {file.name}
                      </Text>
                      <Text style={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFile(index)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="close-circle" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Already have an account? </Text>
          <Link href="/(auth)/login" style={styles.link}>
            <Text style={styles.linkTextBold}>Login</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  form: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 24,
    backgroundColor: "#87CEEB",
    flexGrow: 1,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  linkText: {
    color: "#666",
  },
  link: {
    color: "#007AFF",
  },
  linkTextBold: {
    color: "#007AFF",
    fontWeight: "600",
  },
  section: {
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  planCardSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f8ff",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  planIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  planTitleSelected: {
    color: "#007AFF",
  },
  planDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  planDescriptionSelected: {
    color: "#0066cc",
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  planPriceSelected: {
    color: "#007AFF",
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#888",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "rgba(135, 206, 235, 0.05)",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#87CEEB",
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  fileCount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 8,
  },
  filesContainer: {
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  filesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fileDetails: {
    marginLeft: 8,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
  },
  removeButton: {
    padding: 4,
  },
});
