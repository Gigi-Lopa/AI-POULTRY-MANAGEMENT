import styles from "@/styles/main";
import React from "react";
import { Text, TextInput, View } from "react-native";

const AnalyseSymptom = () => {
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={[styles.h6]}>Enter Symptoms</Text>
      <TextInput
        style={[
          styles.defaultInput,
          { marginTop: 5, backgroundColor: "#ffffff" },
        ]}
        multiline
        numberOfLines={10}
        placeholder="Enter symptons ..."
      ></TextInput>
    </View>
  );
};

export default AnalyseSymptom;
