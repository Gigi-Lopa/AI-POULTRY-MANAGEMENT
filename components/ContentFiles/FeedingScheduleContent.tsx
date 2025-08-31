import useSchedule from "@/hooks/useSchedule";
import styles from "@/styles/main";
import { Schedule } from "@/types";
import { Bell } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Alert from "../Alert";
import ScheduleCard from "../ScheduleCard";
import Spinner from "../Spinner";

interface FeedingScheduleProps {
  schedules : Schedule[],
  setSchedules : (value : Schedule[]) => void;
  openModal: (event: GestureResponderEvent) => void;
}

const FeedingScheduleContent = ({ openModal, schedules, setSchedules }: FeedingScheduleProps) => {
  const {
    feedStatus,
    deleteSchedule,
    fetchSchedules,

  } = useSchedule(()=> {},
  schedules,
  setSchedules );

  useEffect (()=> fetchSchedules, [])

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
        { 
          !feedStatus.loading &&
          schedules.length !== 0 &&
          schedules.map((schedule : Schedule, index:number)=>
            <ScheduleCard key={index} schedule = {schedule} deleteSchedule = {deleteSchedule}/>
          
          )
        }
          {feedStatus.loading && (
            <View style={[styles.h30, styles.w100, styles.flexColumn, styles.centerItems]}>
              <Spinner size="medium" />
              <Text style={[styles.p]}>Loading...</Text>
            </View>
          )
        }
       {schedules.length === 0  && !feedStatus.loading && <Alert message="No schedules created." variant={"ghost"} />}

      </View>
    </View>
  );
};

export default FeedingScheduleContent;
