import { clearAllCache } from "@/cache";
import { NetworkStatusContext } from "@/context/NetworkStatusProvider";
import styles from "@/styles/main";
import { useRouter } from "expo-router";
import { Bird, LogOut, Wifi, WifiOff } from "lucide-react-native";
import React, { useContext } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Spinner from "./Spinner";

const Header = () => {
  const router = useRouter();
  const {isOffline} = useContext(NetworkStatusContext);

  const handleLogOut = async () => {
    try {
      await clearAllCache();
      router.replace("/");   
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={[]}>
      <View
        style={[
          styles.w100,
          styles.justifyBetween,
          styles.flexRow,
          styles.header,
          Platform.OS === "android" ? styles.androidShadow : styles.iosShadow,
        ]}
      >
        <View style={[styles.flexRow]}>
          <Bird size={25} color={styles.bg_success.backgroundColor} />
          <Text style={[styles.h6, styles.selfCenter, { marginLeft: 5 }]}>
            Poultry Management
          </Text>
        </View>
        <View style = {[styles.flexRow]}>
          <View style = {[{marginRight : 15}]}>
            {
              isOffline === null ?
              <Spinner size={"small"}/>
              : isOffline === false ?
              <Wifi size={18} color={styles.bg_success.backgroundColor}></Wifi> : 
              <WifiOff size={18} color={styles.bg_danger.backgroundColor}/> 
            }
          </View>
          <TouchableOpacity onPress={handleLogOut} >
            <LogOut size={18}/>
          </TouchableOpacity>
      
        </View>
      </View>
    </View>
  );
};

export default Header;
