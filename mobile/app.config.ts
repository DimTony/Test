export default {
  expo: {
    name: "CRS",
    slug: "syncbrite",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.crspublicity.chat",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.crspublicity.crs", // 👈 REQUIRED
    },
    web: {
      favicon: "./assets/images/icon.png",
      bundler: "metro",
    },
    scheme: "expo-auth-app",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001/api",
      socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3001",
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || "development",
      eas: {
        projectId: "a135cada-cbc9-47b0-8617-d0412b4eaa1b",
      },
    },
  },
};
