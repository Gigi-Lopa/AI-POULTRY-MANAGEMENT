import { clearAllCache } from "@/cache";
import styles from "@/styles/main";
import { useRouter } from "expo-router";
import { Bird, LogOut } from "lucide-react-native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  const router = useRouter();

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
        <TouchableOpacity onPress={handleLogOut} >
          <LogOut/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
