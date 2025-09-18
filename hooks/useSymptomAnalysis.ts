import { loadFromCache } from "@/cache";
import { NetworkStatusContext } from "@/context/NetworkStatusProvider";
import { AIChat } from "@/types";
import { useContext, useEffect, useState } from "react";

export default function useSymptomAnalysis (){

    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions]= useState<AIChat[]>([])
    const [prompt, setPrompt] = useState("")
    const [USER_ID, setUSER_ID] = useState(null);
    const {isOffline} = useContext(NetworkStatusContext);

    useEffect(()=>{
        const getToken = async () => {
          const token = await loadFromCache("token")
          setUSER_ID(token.userID)
        }
        getToken()
    }, [])

    const getSuggestion = () => {
        if(isOffline === true) return;
        if(prompt.trim().length === 0) return
         
        setLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/ai`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            user_id: USER_ID,
            prompt: prompt
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                const response_ = response.response;
                const s:AIChat = {
                    prompt : prompt,
                    response: response_
                }
                setSuggestions([s, ...suggestions]);
            } else {
            import('react-native').then(({ ToastAndroid }) => {
                ToastAndroid.show("Failed to get suggestions", ToastAndroid.SHORT);
            });
            }
        })
        .catch(error => {
            console.log(error);
            import('react-native').then(({ ToastAndroid }) => {
            ToastAndroid.show("Network error", ToastAndroid.SHORT);
            });
        })
        .finally(() => {
            setLoading(false); 
            setPrompt("");
        });
    } 

    return {
        loading,
        suggestions,
        prompt,
        USER_ID,
        setPrompt,
        getSuggestion,
    }
}