import { Network } from "@/types";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

export default function useNetworkStatus() {
  const [network, setNetwork] = useState<Network>({ isOffline: null });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/system`);
        const data = await res.json();

        if (data.success) {
          setNetwork({ isOffline: false });
        } else {
          setNetwork({ isOffline: true });
        }
      } catch (err) {
        ToastAndroid.show("Switched to offline Mode", ToastAndroid.SHORT);
        console.log("Network error:", err);
        setNetwork({ isOffline: true });
      }
    };

    checkStatus();

  }, []);

  return { network };
}
