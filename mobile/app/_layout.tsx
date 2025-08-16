// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }


"use client";

import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { AuthProvider } from "../providers/AuthProvider";
import { useFonts } from "expo-font";
import { Lobster_400Regular } from "@expo-google-fonts/lobster";
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Inter_400Regular, Inter_600SemiBold,Inter_700Bold } from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // CrimsonPro: require("../assets/fonts/CrimsonPro-Bold.ttf"),
    // Cabin: require("../assets/fonts/Cabin-Regular.ttf"),
    // CrimsonPro_Regular: require("../assets/fonts/CrimsonPro-Regular.ttf"),
    // CrimsonPro_Bold: require("../assets/fonts/CrimsonPro-Bold.ttf"),
    // CrimsonPro_Italic: require("../assets/fonts/CrimsonPro-Italic.ttf"),
    // Urbanist_400Regular,
    // Urbanist_500Medium,
    // Urbanist_600SemiBold,
    // Urbanist_700Bold,
    // Roboto_400Regular,
    // Roboto_500Medium,
    // Roboto_700Bold,
    Lobster_400Regular,
    Poppins_400Regular,
    Poppins_700Bold,
    Inter_700Bold,

    // ...FontAwesome.font,
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)" />
      </Stack>
    </AuthProvider>
  );
}
