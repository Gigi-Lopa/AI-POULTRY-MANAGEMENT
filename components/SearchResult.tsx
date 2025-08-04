import styles from "@/styles/main";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

interface props {
  id: string;
  name: string;
  onUpdate: (value: string) => void;
}
const SearchResults = ({ id, name, onUpdate }: props) => {
  return (
    <View
      style={[
        styles.inputSearchResults,
        Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
      ]}
    >
      <TouchableOpacity
        onPress={() => onUpdate(id)}
        style={[styles.inputSearchResult, styles.borderBottom]}
      >
        <Text style={[styles.p]}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchResults;
