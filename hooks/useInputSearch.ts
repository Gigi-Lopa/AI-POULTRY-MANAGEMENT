import { InputSearchResult, ScheduleFormData } from "@/types";
import { useEffect, useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import useDebounce from "./useDebounce";
import useSymptomAnalysis from "./useSymptomAnalysis";

export default function useInputSearch(link: string, handleChange: ( field: keyof ScheduleFormData, value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string) => void){
  const {USER_ID} = useSymptomAnalysis();
  const [results, setResults] = useState<InputSearchResult[]>([]);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false)
  const debounceSearch = useDebounce(query, 300);

  const queryResults = () => {
    if(!USER_ID) return;
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}${link}?id=${USER_ID}&&q=${debounceSearch.trim()}`)
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
  
  useEffect (()=> {
    if (debounceSearch.trim().length){
      queryResults();
    }
  }, [debounceSearch]) 

  const onUpdate = (flock:InputSearchResult) =>{
    handleChange("flock_id", flock._id);
    setQuery(flock.label);
    setShow(false)
  }
  const onQuery = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setQuery(event.nativeEvent.text);
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
