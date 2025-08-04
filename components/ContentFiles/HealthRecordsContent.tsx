import styles from "@/styles/main";
import { Plus } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AnalyseSymptom from "../AnalyseSymptom";

const HealthRecordsContent = () => {
  return (
    <View>
      <View style={[styles.flexRow, styles.justifyBetween]}>
        <Text style={[styles.selfCenter, styles.h6, { marginTop: 2 }]}>
          Journal Vaccination
        </Text>
        <TouchableOpacity style={[styles.normalButtonSM, styles.bg_success]}>
          <View style={[styles.selfCenter, { marginRight: 10 }]}>
            <Plus size={13} color={styles.bg_white.backgroundColor} />
          </View>
          <Text style={[styles.btnText, styles.text_white]}>
            Record Vaccination
          </Text>
        </TouchableOpacity>
      </View>
      <AnalyseSymptom />
    </View>
  );
};

export default HealthRecordsContent;
