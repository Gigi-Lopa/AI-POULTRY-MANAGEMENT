import useInputSearch from "@/hooks/useInputSearch";
import styles from "@/styles/main";
import { InputSearchResult } from "@/types";
import React from "react";
import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from "react-native";
import SearchResults from "./SearchResult";

interface props {
  label: string;
  placeholder?: string;
  handleChange: ( field: any, value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string) => void;
}

const InputSearch = ({ label, placeholder , handleChange}: props) => {
  const { results, query, onQuery, onUpdate, show, setShow} = useInputSearch("/api/flocks/s", handleChange);
  
  return (
    <View style={styles.positionRelative}>
      <View>
        <Text style={[styles.h6]}>{label}</Text>
        <TextInput
          value={query}
          onChange={onQuery}
          onBlur={()=> setShow(false)}
          style={[styles.defaultInput]}
          placeholder={placeholder ? placeholder : ""}
        />
      </View>
      {show && (
        <View
              style={[
                styles.inputSearchResults,
                Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
              ]}
            >
        {
          results.map((flock:InputSearchResult)=> (
            <SearchResults
              key={flock._id}
              flock={flock}
              onUpdate={onUpdate}/>
          ))
        }
        </View>
      )}
    </View>
  );
};

export default InputSearch;
