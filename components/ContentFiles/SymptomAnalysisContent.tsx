import styles from "@/styles/main";
import { AIChat } from "@/types";
import { Send } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import Spinner from "../Spinner";

interface props{
  prompt :string 
  suggestions :  AIChat[]
  loading : boolean
  setPrompt : React.Dispatch<React.SetStateAction<string>>;
  getSuggestion : ()=> void;
}

const SymptomAnalysisContent = ({prompt, suggestions, loading, setPrompt, getSuggestion}: props) => {
  return (
    <View style={{ marginTop: 0 }}>
      <Text style={[styles.h6]}>Enter Symptoms</Text>
      <View style = {[styles.flexRow, styles.justifyBetween]}>
        <TextInput
          style={[
            styles.defaultInput,
            { marginTop: 5, backgroundColor: "#ffffff" },
            styles.w70
          ]}
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={10}
          placeholder="Enter symptoms ..."
        />
        <TouchableOpacity onPress={getSuggestion} disabled = {loading} style ={[styles.normalButtonSM, loading ? styles.bg_success_30 : styles.bg_success, styles.centerItems, styles.selfCenter]}>
          {
            loading ?
            <Spinner color="white" size="small"/> :
            <Send size={18} color={"white"}/>
          }
        </TouchableOpacity>
      </View>
      <View style = {[{marginTop : 10}]}>
        {
          suggestions.map((s: AIChat, index:number)=> 
            <View key={index} style={[styles.flexColumn, {marginBottom: 25}]}>
                <View key={index} style = {[styles.dashboardCard, styles.w100, {marginBottom : 15}]}>
                <Markdown
                  style={{
                    body: {
                      fontFamily: "Poppins-Medium",
                      fontSize: 12,
                      color: "#333333"
                    }
                  }}
                >
                  {s.response}
                  </Markdown>
                </View>
                <View style= {[styles.w100, styles.flexRow,{justifyContent :"flex-end"}]}>
                  <View style = {[styles.w75, styles.prompt,{backgroundColor :"#f8f8f8ff"}]}>
                    <Text style= {[styles.p]}>{s.prompt}</Text>
                  </View>
                </View>
            </View>
           
          )
        }
      </View>

    </View>
  );
};

export default SymptomAnalysisContent;
