"use client";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, Redirect, router } from "expo-router";
import { useAuthStore } from "../store/auth";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnFour, OnOne, OnThree, OnTwo } from "@/components/SvgIllustrations";

const { width: screenWidth } = Dimensions.get("window");

export default function LandingPage() {
  const { user, logout } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      router.replace("/(protected)/dashboard");
    }
  }, [user]);

  const carouselItems = [
    {
      id: 1,
      title: "CRS Portal",
      subtitle: "Manage your resources and assets",
      component: <OnOne width={350} height={400} />,
      backgroundColor: "transparent",
    },
    {
      id: 2,
      title: "CRS Portal",
      subtitle: "Protected data management",
      component: <OnTwo width={350} height={400} />,
      backgroundColor: "transparent",
    },
    {
      id: 3,
      title: "CRS Portal",
      subtitle: "Streamlined resource oversight",
      component: <OnThree width={350} height={400} />,
      backgroundColor: "transparent",
    },
    {
      id: 4,
      title: "CRS Portal",
      subtitle: "Ease of Access and Control",
      component: <OnFour width={350} height={400} />,
      backgroundColor: "transparent",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      //@ts-ignore
      autoScrollInterval.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % carouselItems.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * screenWidth,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [isAutoScrolling, carouselItems.length]);

  const pauseAutoScroll = () => {
    setIsAutoScrolling(false);
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000); // Resume auto-scroll after 5 seconds of inactivity
  };

  const handleScroll = (event: any) => {
    const slideSize = screenWidth;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(index);
  };

  const handleUserScroll = (event: any) => {
    pauseAutoScroll();
    handleScroll(event);
  };

  const goToSlide = (index: number) => {
    pauseAutoScroll();
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
  };

  const handleLogout = async () => {
    await logout();
    // No need to redirect here as the user state change will handle it
  };

  // Don't show landing page content if user is authenticated
  if (user) {
    // return null; // or a loading spinner
     return <Redirect href="/(protected)/(tabs)/dashboard" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleUserScroll}
            scrollEventThrottle={16}
            style={styles.carousel}
          >
            {carouselItems.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.carouselItem,
                  { backgroundColor: item.backgroundColor },
                ]}
              >
                {item.component}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ display: "flex", alignItems: "flex-start" }}>
          <Text style={styles.manage}>{carouselItems[currentIndex].title}</Text>
          <Text style={styles.manageSub}>
            {carouselItems[currentIndex].subtitle}
          </Text>
        </View>

        <View style={styles.login}>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.pagination}>
          {carouselItems.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.paginationDotActive,
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  carouselContainer: {
    height: 450,
    marginTop: 50,
  },
  carousel: {
    flex: 1,
  },
  carouselItem: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: "6%",
    paddingHorizontal: 24,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#89cff0",
    width: 20,
  },
  customComponent: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#89cff0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  overlayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  multiComponent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  featureList: {
    marginTop: 20,
    backgroundColor: "transparent",
  },
  featureItem: {
    fontSize: 16,
    color: "#89cff0",
    marginVertical: 4,
    textAlign: "center",
    fontFamily: "Manrope_400Regular",
  },
  logo: {
    width: 200,
    height: 33,
  },
  prime: {
    fontSize: 15,
    // color: "orange",
  },
  manage: {
    // position: "absolute",
    // bottom: "15%",
    // fontSize: 30,
    paddingHorizontal: 24,
    // color: "#003366",
    fontSize: 30,
    color: "#89cff0",
    textShadowColor: "#91bfff", // Keep this for React Native
    textShadowOffset: { width: 1, height: 1 }, // Defines the shadow position
    textShadowRadius: 1, // Controls the blur intensity
    // fontWeight: "400",
    letterSpacing: 1.3,
    fontFamily: "Barlow_400Regular",
    // marginTop: 20,
    textAlign: "center",
  },
  manageSub: {
    fontSize: 18,
    fontFamily: "Manrope_400Regular",
    paddingHorizontal: 24,
    // marginTop: 10,
    textAlign: "center",
  },
  reactLogo: {
    top: "20%",
    right: 0,
    position: "absolute",
  },
  card13: {
    position: "absolute",
    zIndex: 2,
  },
  card15: {
    position: "absolute",
    left: "10%",
    top: "10%",
    zIndex: 1,
  },
  login: {
    paddingHorizontal: 24,
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 10,
    // marginTop: 40,
    position: "absolute",
    bottom: "10%",
  },
  getStartedButton: {
    fontSize: 14,
    backgroundColor: "#89cff0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 50,
    minWidth: 120,
    borderRadius: 8,
  },
  getStartedText: {
    fontSize: 16,
    color: "#000",
    fontWeight: 600,
    fontFamily: "Barlow_600SemiBold",
  },
  button: {
    backgroundColor: "transparent",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    height: 50,
    minWidth: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#89cff0",
  },
  buttonText: {
    fontSize: 16,
    color: "#89cff0",
    textShadowColor: "#91bfff", // Keep this for React Native
    textShadowOffset: { width: 1, height: 1 }, // Defines the shadow position
    textShadowRadius: 1, // Controls the blur intensity
    fontWeight: "400",
    letterSpacing: 1.1,
    fontFamily: "Barlow_600SemiBold",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: "25%",
    paddingHorizontal: 24,
  },
});
