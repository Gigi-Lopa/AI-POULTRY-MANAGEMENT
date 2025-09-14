
import styles from "@/styles/main";
import { AIRecommendation, FlockResponse } from "@/types";
import { Brain, Plus } from "lucide-react-native";
import React from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import AIRecommendationCard from "../AIRecommendationCard";
import Alert from "../Alert";
import FlockCard from "../FlockCard";
import Spinner from "../Spinner";
interface OverviewContentProps {
  openModal: (event: GestureResponderEvent) => void;
  flocks : FlockResponse[],
  deleteFlock : (id : string) => void;
  AI_RECOMMENDATIONS : AIRecommendation[],
  status : {
    loading : boolean,
    error : string 
  }
  AILoadingStatus :  {
    loading: boolean
  }

}

const OverviewContent = ({ status, openModal, flocks, deleteFlock, AILoadingStatus, AI_RECOMMENDATIONS }: OverviewContentProps) => {
  return (
    <View>
      {status.loading && (
        <View style={[styles.h30, styles.w100, styles.flexColumn, styles.centerItems]}>
          <Spinner size="medium" />
          <Text style={[styles.p]}>Loading...</Text>
        </View>
      )}

      {status.error.length != 0 && <Alert message={status.error} variant="danger" />}
      {flocks.length === 0 && !status.loading && status.error.length === 0 && <Alert message="No flocks registered." variant={"ghost"} />}
      {!status.loading && status.error.length === 0 && flocks.length !== 0  && flocks.map((flock: FlockResponse) => <FlockCard deleteFlock = {deleteFlock} key={flock._id} flock={flock} />)}

      <View style={[styles.w100, { marginTop: 12 }]}>
        <TouchableOpacity
          style={[styles.bg_success, styles.buttonSM, styles.flexRow, styles.centerItems]}
          onPress={openModal}
        >
          <Plus size={10} color={styles.bg_white.backgroundColor} style={{ marginBottom: 1 }} />
          <Text style={[styles.btnText, styles.text_white, { marginLeft: 8 }]}>Add Flock</Text>
        </TouchableOpacity>
      </View>
      <View style = {[styles.mTop]}>
        <View style = {[styles.flexRow]}>
          <Brain color={styles.bg_purple.backgroundColor}/>
          <Text style = {[styles.h5, styles.fontBold, {marginLeft : 10}]}>AI Recommendations</Text>
          <Text style = {[styles.p, styles.selfCenter, styles.fontBold, {marginLeft : 10}]}>{AI_RECOMMENDATIONS.length + " suggestions"} </Text>

        </View>
        <View style = {[{marginTop : 10}]}>
          {
            AILoadingStatus.loading &&
            <View style={[styles.h30, styles.centerItems, styles.flexColumn]}>
              <Spinner color={styles.bg_success.backgroundColor}/>
              <Text style = {[styles.p, {marginTop : 10}]}>This might take a minute ...</Text>
            </View>
          }
          {
            !AILoadingStatus.loading &&
            AI_RECOMMENDATIONS.length === 0 &&
            <View style = {[{marginTop : 10}]}>
              <Alert message="No suggestions Available" variant="ghost"/> 
            </View>
          }
          {
            !AILoadingStatus.loading &&
            AI_RECOMMENDATIONS.length != 0 &&
            AI_RECOMMENDATIONS.map((r: AIRecommendation, index: number)=>
              <AIRecommendationCard key={index} recommendation = {r}/>
            )
          }
        </View>
      </View>
    </View>
  );
};

export default OverviewContent;
