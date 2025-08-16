import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const BlurButton = ({
  title = "Blur Button",
  onPress,
  style,
  textStyle,
  variant = "light", // "light", "dark", "semi"
  disabled = false,
}: any) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "dark":
        return {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        };
      case "semi":
        return {
          backgroundColor: "rgba(128, 128, 128, 0.4)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        };
      default: // light
        return {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(255, 255, 255, 0.5)",
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "dark":
        return "#ffffff";
      case "semi":
        return "#ffffff";
      default: // light
        return "#333333";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.blurEffect, getButtonStyle()]}>
        <Text style={[styles.buttonText, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  blurEffect: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    //@ts-ignore
    backdropFilter: "blur(10px)", // Web only
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 8,
    minWidth: 200,
  },
  customButton: {
    borderRadius: 15,
  },
  customText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  // Advanced frosted glass effect
  frostButton: {
    marginVertical: 8,
    minWidth: 200,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  frostInner: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.4)",
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    borderLeftColor: "rgba(255, 255, 255, 0.2)",
    borderRightColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  frostText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 

export default BlurButton;