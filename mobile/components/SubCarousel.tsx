import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

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

const CarouselCard = ({ item }: any) => {
  const getStatusColor = (status: any) => {
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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>IMEI:</Text>
          <Text style={styles.value}>{item.imei}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{formatDate(item.startDate)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.value}>{formatDate(item.endDate)}</Text>
        </View>
      </View>
    </View>
  );
};

const HorizontalCarousel = () => {
  const renderItem = ({ item }: any) => <CarouselCard item={item} />;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Services</Text> */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F9FAFB",
    // paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 16,
    marginHorizontal: 20,
  },
  carouselContainer: {
    paddingHorizontal: 20,
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
  },
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
});

export default HorizontalCarousel;
