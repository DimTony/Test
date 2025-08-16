import React, { memo, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInput as TextInputType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ isFocused, setIsFocused }) => {
    const textInputRef = useRef<TextInputType>(null);

    return (
      <View
        style={[
          styles.searchContainer,
          {
            shadowOpacity: isFocused ? 0.2 : 0.1,
            elevation: isFocused ? 3 : 1, // For Android shadow
          },
        ]}
      >
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          ref={textInputRef}
          onFocus={() => {
            console.log("TextInput focused");
            setIsFocused(true);
          }}
          onBlur={() => {
            console.log("TextInput blurred");
            setIsFocused(false);
          }}
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 3,
    gap: 4,
  },
  input: {
    backgroundColor: "transparent",
    width: "93%",
    paddingVertical: 4,
    fontSize: 16,
    color: "#000",
  },
});

export default SearchBar;
