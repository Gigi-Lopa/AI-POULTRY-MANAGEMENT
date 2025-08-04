import useInputSearch from "@/hooks/useInputSearch";
import styles from "@/styles/main";
import React from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface props {
  label: string;
  placeholder?: string;
}

const InputSearch = ({ label, placeholder }: props) => {
  const { results, query, onQuery, updateValue } = useInputSearch("");
  return (
    <View style={styles.positionRelative}>
      <View>
        <Text style={[styles.h6]}>{label}</Text>
        <TextInput
          value={query}
          onChange={onQuery}
          style={[styles.defaultInput]}
          placeholder={placeholder ? placeholder : ""}
        />
      </View>
      {results.length !== 0 && (
        <View
          style={[
            /** RENDER SEARCHRESULT.tsx INSTEAD **/
            styles.inputSearchResults,
            Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
          ]}
        >
          <TouchableOpacity
            onPress={() => updateValue("ed")}
            style={[styles.inputSearchResult, styles.borderBottom]}
          >
            <Text style={[styles.p]}>Flock One</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InputSearch;
