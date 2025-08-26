import { InputSearchResults } from "@/types";
import { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import useDebounce from "./useDebounce";

export default function useInputSearch(link: string) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [results, setResults] = useState<InputSearchResults>([]);
  const [query, setQuery] = useState("");
  const debounceSearch = useDebounce(query, 300);

  const updateValue = (value: string) => setSelectedValue(value);

  const queryResults = () => {
    console.log("Querying for:", link);
  };

  const onQuery = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setQuery(event.nativeEvent.text);
    queryResults();
    setResults([]);
  };

  return {
    results,
    query,
    selectedValue,
    onQuery,
    updateValue,
  };
}
