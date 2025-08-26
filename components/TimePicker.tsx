import useTimePicker from "@/hooks/useTimePicker";
import styles from "@/styles/main";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TimePickerProps {
  onTimeChange?: (time: Date) => void;
  defaultTime : Date | null | undefined
}

export default function TimePicker({ onTimeChange, defaultTime }: TimePickerProps) {
  const { time, show, onChange, openPickerDialog } = useTimePicker(defaultTime);

  const handleChange = (event: any, selectedTime?: Date) => {
    onChange(event, selectedTime);
    if (selectedTime && onTimeChange) {
      onTimeChange(selectedTime);
    }
  };

  return (
    <View style={[styles.flexRow]}>
      <TouchableOpacity
        style={[styles.buttonOutline]}
        onPress={openPickerDialog}
      >
        <Text style={[styles.p]}>Pick Time</Text>
      </TouchableOpacity>
      <Text style={[styles.p, styles.selfCenter, { marginLeft: 20 }]}>
        Selected Time: {time?.toLocaleTimeString() || "00:00"}
      </Text>

      {show && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
