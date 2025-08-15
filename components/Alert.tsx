import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AlertVariant = "danger" | "success" | "warning" | "ghost";

interface AlertProps {
  variant?: AlertVariant;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap; 
}

export default function Alert({ variant = "ghost", message, icon }: AlertProps) {
  const variantStyles = getVariantStyles(variant);
  const variantIcon = icon || getVariantIcon(variant);

  return (
    <View style={[styles.container, variantStyles.container]}>
      <Ionicons name={variantIcon} size={20} color={variantStyles.icon.color} style={styles.icon} />
      <Text style={[styles.text, variantStyles.text]}>{message}</Text>
    </View>
  );
}

const getVariantStyles = (variant: AlertVariant) => {
  switch (variant) {
    case "danger":
      return { container: { backgroundColor: "#f8d7da" }, text: { color: "#721c24" }, icon: { color: "#721c24" } };
    case "success":
      return { container: { backgroundColor: "#d4edda" }, text: { color: "#155724" }, icon: { color: "#155724" } };
    case "warning":
      return { container: { backgroundColor: "#fff3cd" }, text: { color: "#856404" }, icon: { color: "#856404" } };
    case "ghost":
    default:
      return { container: { backgroundColor: "transparent" }, text: { color: "#6c757d" }, icon: { color: "#6c757d" } };
  }
};

const getVariantIcon = (variant: AlertVariant): keyof typeof Ionicons.glyphMap => {
  switch (variant) {
    case "danger":
      return "alert-circle";
    case "success":
      return "checkmark-circle";
    case "warning":
      return "warning";
    case "ghost":
    default:
      return "information-circle";
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    flexShrink: 1,
  },
});
