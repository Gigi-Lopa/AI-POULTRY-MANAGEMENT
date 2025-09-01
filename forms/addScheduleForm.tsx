import Alert from "@/components/Alert";
import DayCheckbox from "@/components/DayCheckbox";
import InputSearch from "@/components/InputSearch";
import TimePicker from "@/components/TimePicker";
import useSchedule from "@/hooks/useSchedule";
import styles from "@/styles/main";
import type { NotifyDay } from "@/types";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface props{
  onUpdate : (value: any) => void
}
const AddScheduleForm = ({onUpdate}:props) => {
    const {
      scheduleForm,
      notifyDays,
      isNotify,
      validateForm,
      status,
      toggleNotify,
      validate,
      handleChange,
      setNotifyDays
    } = useSchedule(onUpdate);

    return (
      <View style={{ padding: 16 }}>
        <InputSearch
          handleChange={handleChange}
          label="Search Flock"
          placeholder="e.g. Flock One"
          />
        <View style={{ marginTop: 12 }}>
          <Text style={styles.h6}>Feed</Text>
          <TextInput
            style={[styles.defaultInput, validateForm.isFeed && styles.inputError]}
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
              validateForm.isAmount && styles.inputError ,
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

        <View style={{ marginTop: 12 }}>
          <TimePicker defaultTime={scheduleForm.time} onTimeChange={(date) => handleChange("time", date)} />
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
          <Text style={[styles.h6, styles.selfCenter,{ marginLeft: 8}]}>Notify</Text>
        </View>
        {
          validateForm.isNotifyDays &&
          <Alert variant="danger" message="Select at lease one day to repeat"/>
        }
        {
          validateForm.isFlockSelected &&
          <Alert variant="danger" message="Flock not Selected"/>
        }
        {
          status.error &&
           <Alert variant="danger" message="Internal Server error"/>
        }
        {
          status.success && 
          <Alert variant={"success"} message="Schedule created successfully" />
        }

        <TouchableOpacity
          disabled = {status.loading}
          style={[
            status.loading ?
            styles.bg_success_30 :
            styles.bg_success,
            styles.buttonSM,
            styles.flexRow,
            styles.centerItems,
            { marginTop: 10 },
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
