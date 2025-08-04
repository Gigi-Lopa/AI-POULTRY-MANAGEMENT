import styles from "@/styles/main";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

interface props {
  label: string;
  isChecked: boolean;
  setChecked: (state: boolean) => void;
}

export default function DayCheckbox({ label, isChecked, setChecked }: props) {
  return (
    <View style={styles.checkBox}>
      <Checkbox
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? styles.bg_success.backgroundColor : undefined}
      />
      <Text style={[{ marginLeft: 8 }, styles.p]}>{label}</Text>
    </View>
  );
}
