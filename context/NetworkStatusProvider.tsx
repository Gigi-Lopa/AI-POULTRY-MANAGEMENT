import useNetworkStatus from "@/hooks/useNetworkStatus";
import { Network } from "@/types";
import React, { createContext } from "react";

interface Props {
  children: React.ReactNode;
}

export const NetworkStatusContext = createContext<Network>({
  isOffline: null,
});

export const NetworkStatusProvider = ({ children }: Props) => {
  const { network } = useNetworkStatus();

  return (
    <NetworkStatusContext.Provider value={network}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
