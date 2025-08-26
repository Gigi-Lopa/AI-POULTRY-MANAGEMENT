
import useOverviewContent from "@/hooks/useOverviewContent";
import styles from "@/styles/main";
import { FlockResponse } from "@/types";
import { Plus } from "lucide-react-native";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import Alert from "../Alert";
import FlockCard from "../FlockCard";
import Spinner from "../Spinner";

interface OverviewContentProps {
  openModal: (event: GestureResponderEvent) => void;
  flocks : FlockResponse[],
  deleteFlock : (id : string) => void;
  setFlocks  : (value: FlockResponse[])=> void
}

const OverviewContent = ({ openModal, flocks, deleteFlock, setFlocks }: OverviewContentProps) => {
  const {
    loading,
    error,
    empty
  } = useOverviewContent({setFlocks});

  return (
    <View>
      {loading && (
        <View style={[styles.h30, styles.w100, styles.flexColumn, styles.centerItems]}>
          <Spinner size="medium" />
          <Text style={[styles.p]}>Loading...</Text>
        </View>
      )}

      {error && <Alert message="An error occurred. Please try again." variant="danger" />}
      {empty && !loading && !error && <Alert message="No flocks registered." variant={"ghost"} />}
      {!loading && !error && !empty && flocks.map((flock: FlockResponse) => <FlockCard deleteFlock = {deleteFlock} key={flock._id} flock={flock} />)}

      <View style={[styles.w100, { marginTop: 12 }]}>
        <TouchableOpacity
          style={[styles.bg_success, styles.buttonSM, styles.flexRow, styles.centerItems]}
          onPress={openModal}
        >
          <Plus size={10} color={styles.bg_white.backgroundColor} style={{ marginBottom: 1 }} />
          <Text style={[styles.btnText, styles.text_white, { marginLeft: 8 }]}>Add Flock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OverviewContent;
