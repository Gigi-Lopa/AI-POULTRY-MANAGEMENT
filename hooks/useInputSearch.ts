import { USER_ID } from "@/constants";
import { InputSearchResult, ScheduleFormData } from "@/types";
import { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import useDebounce from "./useDebounce";

export default function useInputSearch(link: string, handleChange: ( field: keyof ScheduleFormData, value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string) => void){
  const [results, setResults] = useState<InputSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false)
  const debounceSearch = useDebounce(query, 300);

  const queryResults = () => {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}${link}?id=${USER_ID}&&q=${debounceSearch}`)
    .then(response => response.json())
    .then(response => {
      if (response.success){
        setShow(true)
        console.log(response.flocks)
        setResults(response.flocks)
      }
    })
    .catch(error => console.log(error))
   };

  const onUpdate = (flock:InputSearchResult) =>{
    handleChange("flock_id", flock._id);
    setQuery(flock.label);
  }
  const onQuery = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setQuery(event.nativeEvent.text);
    queryResults();
  };

  return {
    results,
    query,
    show, 
    setShow,
    onQuery,
    onUpdate
  };
}
