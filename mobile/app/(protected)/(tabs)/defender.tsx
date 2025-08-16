import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import StatusDot from "@/components/StatusDot";
import { statusTextStyles } from "@/lib/utils";
import SubscriptionProgress from "@/components/ProgressBar";
import { useCallback } from "react";
import Carousel from "react-native-snap-carousel";
import HorizontalCarousel from "@/components/SubCarousel";
import BlurButton from "@/components/BlurButton";

const { width: screenWidth } = Dimensions.get("window");

export default function DefenderScreen() {
  const insets = useSafeAreaInsets();

  const data = [
    {
      title: "Secure Calls",
      imei: "797972729228",
      status: "active",
      startDate: "2025-06-01T00:00:00.000Z",
      endDate: "2025-07-17T00:00:00.000Z",
    },
    {
      title: "Encrypted Chat",
      imei: "123456789012",
      status: "pending",
      startDate: "2025-06-10T00:00:00.000Z",
      endDate: "2025-07-20T00:00:00.000Z",
    },
    {
      title: "Data Vault",
      imei: "987654321098",
      status: "queued",
      startDate: "2025-06-15T00:00:00.000Z",
      endDate: "2025-07-25T00:00:00.000Z",
    },
  ];


  type SubscriptionStatus = "active" | "queued" | "pending" | "expired";
  type SubscriptionItem = {
    title: string;
    imei: string;
    status: SubscriptionStatus;
    startDate: string;
    endDate: string;
  };

  const CarouselCard = ({ item }: { item: SubscriptionItem }) => {
  
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              color: "black",
              fontSize: 20,
              fontFamily: "Inter_700Bold",
            }}
          >
            {item.title}
          </Text>

          <Feather name="more-vertical" size={24} color="black" />
        </View>

        <Text
          style={{
            fontSize: 12,
            color: "#000",
            fontFamily: "Poppins_400Regular",
            marginVertical: 5,
          }}
        >
          IMEI: {item.imei}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={statusTextStyles[item.status]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>

          <StatusDot status={item.status} />
        </View>

        <SubscriptionProgress
          startDate={item.startDate}
          endDate={item.endDate}
        />

        <TouchableOpacity
          style={{
            backgroundColor: "#87ceeb",
            paddingVertical: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_700Bold",
              fontWeight: 600,
              fontSize: 16,
              color: "#2c2c2c",
            }}
          >
            Renew Now
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ActionCard = ({ item }: { item: any }) => {
    const getStatusColor = (status: SubscriptionStatus) => {
      switch (status) {
        case "active":
          return "#10B981"; // Green
        case "pending":
          return "#F59E0B"; // Orange
        case "queued":
          return "#6B7280"; // Gray
        default:
          return "#6B7280";
      }
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const handlePress = (buttonName: any) => {
      console.log(`${buttonName} button pressed!`);
    };

    return (
      // <View
      //   style={{
      //     padding: 6,
      //     backgroundColor: "transparent",
      //     borderWidth: 1,
      //     borderColor: "gray",
      //     borderRadius: 12,
      //     width: screenWidth * 0.2,
      //     height: 120,
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
      // >
      //   <Text>Action</Text>
      // </View>
      <BlurButton
        title="Light Transparent"
        onPress={() => handlePress("Light")}
        variant="light"
        style={styles.button}
      />
    );
  };

  const renderItem = ({ item }: any) => <CarouselCard item={item} />;
  const renderAction = ({ item }: any) => <ActionCard item={item} />;

  return (
    <View style={styles.container}>
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
        <Text
          style={[
            styles.title,
            {
              paddingHorizontal: 24,
              color: "#fff",
              marginBottom: 10,
              fontWeight: "bold",
              fontFamily: "Poppins_400Regular",
            },
          ]}
        >
          CRS Defender
        </Text>

        <ScrollView style={styles.content}>
      

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            snapToInterval={screenWidth * 0.8 + 16} // Card width + margin
            snapToAlignment="start"
            decelerationRate="fast"
          />

          <Text
            style={[
              styles.title,
              {
                marginVertical: 24,
                color: "#fff",
                marginBottom: 10,
                fontWeight: "bold",
                // fontFamily: "Poppins_400Regular",
              },
            ]}
          >
            Quick Action
          </Text>

          <FlatList
            data={data}
            renderItem={renderAction}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            snapToInterval={screenWidth * 0.8 + 16} // Card width + margin
            snapToAlignment="start"
            decelerationRate="fast"
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    // height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // card: {
  //   backgroundColor: "white",
  //   borderRadius: 16,
  //   paddingVertical: 16,
  //   width: "100%",
  //   height: "100%",
  //   gap: 8,
  //   paddingHorizontal: 18,
  //   // justifyContent: "center",
  // },
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
  content: {
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingTop: 24,
    paddingHorizontal: 24,
    // backgroundColor: "#87CEEB",
    flexGrow: 1,
  },
  carouselContainer: {
    // paddingHorizontal: 20,
  },
  card: {
    width: screenWidth * 0.8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // title: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   color: "#111827",
  //   flex: 1,
  // },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  cardContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "400",
    flex: 1,
    textAlign: "right",
  },
  button: {
    marginVertical: 8,
    minWidth: 200,
  },
});
