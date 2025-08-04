import styles from "@/styles/main";
import { Plus } from "lucide-react-native";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import FlockCard from "../FlockCard";

interface OverviewContentProps {
  openModal: (event: GestureResponderEvent) => void;
}

const OverviewContent = ({ openModal }: OverviewContentProps) => {
  return (
    <View>
      <FlockCard />
      <FlockCard />
      <FlockCard />
      <View style={[styles.w100]}>
        <TouchableOpacity
          style={[
            styles.bg_success,
            styles.buttonSM,
            styles.flexRow,
            styles.centerItems,
          ]}
          onPress={openModal}
        >
          <View>
            <Plus
              size={10}
              color={styles.bg_white.backgroundColor}
              style={{ marginBottom: 1 }}
            />
          </View>
          <Text style={[styles.btnText, styles.text_white, { marginLeft: 8 }]}>
            Add Flock
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverviewContent;
