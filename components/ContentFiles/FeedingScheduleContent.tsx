import styles from "@/styles/main";
import { Bell } from "lucide-react-native";
import React from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScheduleCard from "../ScheduleCard";

interface FeedingScheduleProps {
  openModal: (event: GestureResponderEvent) => void;

}
const FeedingScheduleContent = ({ openModal }: FeedingScheduleProps) => {
  return (
    <View>
      <View style={[styles.w100, styles.justifyBetween, styles.flexRow]}>
        <Text style={[styles.selfCenter, styles.h6, { marginTop: 2 }]}>
          Feeding Schedule
        </Text>
        <TouchableOpacity
          onPress={openModal}
          style={[styles.normalButtonSM, styles.bg_success]}
        >
          <View style={[styles.selfCenter, { marginRight: 10 }]}>
            <Bell size={13} color={styles.bg_white.backgroundColor} />
          </View>
          <Text style={[styles.btnText, styles.text_white]}>
            Add Feeding Schedule
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mTop}>
        <ScheduleCard />
        <ScheduleCard />
        <ScheduleCard />
      </View>
    </View>
  );
};

export default FeedingScheduleContent;
