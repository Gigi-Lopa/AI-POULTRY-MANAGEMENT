import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type SpinnerSize = "small" | "medium" | "large" | "button";

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

export default function Spinner({ size = "medium", color = "#16a34a" }: SpinnerProps) {
  const getSize = () => {
    switch (size) {
      case "small":
        return 20;
      case "button":
        return 16; 
      case "large":
        return 40;
      case "medium":
      default:
        return 28;
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size={getSize()} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
