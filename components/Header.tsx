import styles from "@/styles/main";
import { Bird, Settings } from "lucide-react-native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
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
        <TouchableOpacity>
          <Settings />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
