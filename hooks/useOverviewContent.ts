import { loadFromCache } from "@/cache";
import { FlockResponse } from "@/types";
import { useCallback, useEffect, useState } from "react";

interface props {
    setFlocks  : (value: FlockResponse[])=> void
}
export default function useOverviewContent({setFlocks}: props){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [USER_ID, setUSER_ID] = useState(null)

    const fetchFlocks = useCallback(async () => {
        try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks?id=${USER_ID}`);
        const data = await res.json();

        setLoading(false);
        if (data?.success) {
            if (data.flocks.length === 0) {
            setEmpty(true);
            } else {
            setFlocks(data.flocks);
            }
        } else {
            setError(true);
        }
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(()=>{
        const getToken = async () => {
            const token = await loadFromCache("token")
            setUSER_ID(token.userID)
        }
        getToken()
    }, [])

    useEffect(() => {
        if (!USER_ID) return;

        fetchFlocks();
    }, [USER_ID, fetchFlocks]);

  return {
    loading,
    error,
    empty
  }
}