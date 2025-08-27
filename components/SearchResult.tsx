import styles from "@/styles/main";
import { InputSearchResult } from "@/types";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface props {
  flock: InputSearchResult
  onUpdate: (flock:  InputSearchResult) => void;
}
const SearchResults = ({flock ,onUpdate }: props) => {
  return (
      <TouchableOpacity
        onPress={() => onUpdate(flock)}
        style={[styles.inputSearchResult, styles.borderBottom]}
      >
        <Text style={[styles.p]}>{flock.label}</Text>
      </TouchableOpacity>
  );
};

export default SearchResults;
