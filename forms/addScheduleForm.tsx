import DayCheckbox from "@/components/DayCheckbox";
import InputSearch from "@/components/InputSearch";
import TimePicker from "@/components/TimePicker";
import styles from "@/styles/main";
import type { NotifyDay, ScheduleFormData } from "@/types";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import {
  Alert,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddScheduleForm = () => {
  const [isNotify, setIsNotify] = useState(true);
  const toggleNotify = () => setIsNotify((prev) => !prev);

  const [notifyDays, setNotifyDays] = useState<NotifyDay>({
    monday: true,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    flock_id: "",
    user_id: "",
    feed: "",
    amount: "",
    time: null,
    repeat: notifyDays,
    notify: isNotify,
  });

  const handleChange = (
    field: keyof ScheduleFormData,
    value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date
  ) =>
    setScheduleForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "time" && { repeat: notifyDays, notify: isNotify }),
    }));

  const validate = () => {
    const { feed, amount, time } = scheduleForm;
    const trimmedFeed = typeof feed === "string" ? feed.trim() : "";
    const trimmedAmount = typeof amount === "string" ? amount.trim() : "";

    if (!trimmedFeed) {
      return Alert.alert("Validation", "Please enter a feed name");
    }
    if (!trimmedAmount) {
      return Alert.alert("Validation", "Please enter the amount in Kgs");
    }

    if (time === null) {
      return Alert.alert("Validation", "Please pick a time for the schedule");
    }

    const dayValues = Object.values(notifyDays);
    const anyDaySelected = dayValues.some((d) => d === true);

    if (isNotify && !anyDaySelected) {
      return Alert.alert(
        "Validation",
        "Please select at least one day to repeat"
      );
    }

    setScheduleForm((prev) => ({
      ...prev,
      time,
      repeat: notifyDays,
      notify: isNotify,
    }));

    Alert.alert("Success", "Form validated! Submitting…");
    submitForm(scheduleForm);
  };

  const submitForm = (finalData: ScheduleFormData) => {
    console.log("Submitting final data:", finalData);
  };

  return (
    <View style={{ padding: 16 }}>
      <InputSearch label="Flock Name" placeholder="e.g. Flock One" />

      <View style={{ marginTop: 12 }}>
        <Text style={styles.h6}>Feed</Text>
        <TextInput
          style={[styles.defaultInput, !scheduleForm.feed && styles.inputError]}
          value={scheduleForm.feed}
          onChange={(e) => handleChange("feed", e)}
          placeholder="e.g Pallets"
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={styles.h6}>Amount</Text>
        <TextInput
          style={[
            styles.defaultInput,
            !scheduleForm.amount && styles.inputError,
          ]}
          value={scheduleForm.amount}
          onChange={(e) => handleChange("amount", e)}
          placeholder="in Kgs"
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginTop: 12 }}>
        <Text style={styles.h6}>Repeat</Text>
        <View
          style={[
            { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 10 },
          ]}
        >
          {(Object.keys(notifyDays) as (keyof typeof notifyDays)[]).map(
            (day: keyof NotifyDay) => (
              <DayCheckbox
                key={day}
                label={day}
                isChecked={notifyDays[day] || false}
                setChecked={(state) =>
                  setNotifyDays((prev) => ({ ...prev, [day]: state }))
                }
              />
            )
          )}
        </View>
      </View>

      {/* Time picker */}
      <View style={{ marginTop: 12 }}>
        <TimePicker onTimeChange={(date) => handleChange("time", date)} />
      </View>

      <View style={[styles.flexRow, { marginTop: 12 }]}>
        <Switch
          trackColor={{
            false: "#bbb",
            true: styles.bg_success.backgroundColor,
          }}
          thumbColor={isNotify ? styles.bg_success.backgroundColor : "#fff"}
          onValueChange={toggleNotify}
          value={isNotify}
        />
        <Text style={[styles.h6, { marginLeft: 8 }]}>Notify</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.bg_success,
          styles.buttonSM,
          styles.flexRow,
          styles.centerItems,
          { marginTop: 20 },
        ]}
        onPress={validate}
      >
        <Plus size={10} color={styles.bg_white.backgroundColor} />
        <Text style={[styles.btnText, styles.text_white, { marginLeft: 8 }]}>
          Add Flock
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScheduleForm;
