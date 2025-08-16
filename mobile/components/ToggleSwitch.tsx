import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface ToggleSwitchProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isEnabled, onToggle }) => {
  const animatedValue = useRef(new Animated.Value(isEnabled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, animatedValue]);

  const translateX = () =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 65], // Changed from [2, 2]
    });

  const backgroundColor = () =>
    animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#FF3B30", "#28A745"],
    });

  const handleToggle = () => {
    onToggle(!isEnabled);
  };

  return (
    // <TouchableOpacity onPress={handleToggle} activeOpacity={1}>
    //   <Animated.View
    //     style={[styles.track, { backgroundColor: backgroundColor() }]}
    //   >
    //     <Animated.View
    //       style={[styles.thumb, { transform: [{ translateX: translateX() }] }]}
    //     >
    //       {/* <Text style={styles.text}>{isEnabled ? "ON" : "OFF"}</Text> */}
    //       {isEnabled ? (
    //         <View
    //           style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    //         >
    //           <FontAwesome name="lock" size={24} color="gray" />
    //           <Text
    //             style={{
    //               fontWeight: "500",
    //               color: "gray",
    //             }}
    //           >
    //             Secure
    //           </Text>
    //         </View>
    //       ) : (
    //         <View
    //           style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
    //         >
    //           <FontAwesome name="unlock" size={24} color="gray" />
    //           <Text
    //             style={{
    //               fontWeight: "500",
    //               color: "gray",
    //             }}
    //           >
    //             Unsecure
    //           </Text>
    //         </View>
    //       )}
    //     </Animated.View>
    //   </Animated.View>
    // </TouchableOpacity>

    <TouchableOpacity onPress={handleToggle} activeOpacity={1}>
      <Animated.View style={[styles.trackWrapper]}>
        <LinearGradient
          colors={isEnabled ? ["#28a745", "#218838"] : ["#FF3B30", "#c82333"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.track}
        >
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: translateX() }] },
            ]}
          >
            {isEnabled ? (
              <View style={styles.content}>
                <FontAwesome name="lock" size={24} color="gray" />
                <Text style={styles.label}>Secure</Text>
              </View>
            ) : (
              <View style={styles.content}>
                <FontAwesome name="unlock" size={24} color="gray" />
                <Text style={styles.label}>Unsecure</Text>
              </View>
            )}
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackWrapper: {
    borderRadius: 10,
    overflow: "hidden", // Ensures gradient doesn't spill over
  },
  track: {
    width: 180,
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  thumb: {
    width: 110,
    height: 29,
    borderRadius: 8,
    backgroundColor: "#f4f3f4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontWeight: "500",
    color: "gray",
  },
  // track: {
  //   width: 180,
  //   height: 35,
  //   borderRadius: 10,
  //   justifyContent: "center",
  //   // padding: 8,
  //   // paddingVertical: 8,
  //   // paddingHorizontal: 2,
  // },
  // thumb: {
  //   width: 110,
  //   height: 29,
  //   borderRadius: 8,
  //   backgroundColor: "#f4f3f4",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "#171717",
  //   shadowOffset: { width: -2, height: 4 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  // },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ToggleSwitch;
