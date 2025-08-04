import { LucideIcon } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropdownItem = {
  label: string;
  value: string;
};

interface DropdownComponentProps {
  data: DropdownItem[];
  Icon: LucideIcon;
  value: string;
  onChangeValue: (value: string) => void;
}

const DropdownComponent = ({
  data,
  Icon,
  onChangeValue,
  value,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChangeValue(item);
        }}
        renderLeftIcon={() => (
          <Icon size={15} style={{ marginHorizontal: 15 }} color={"#16a34a"} />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  selectedTextStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  inputSearchStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
});
