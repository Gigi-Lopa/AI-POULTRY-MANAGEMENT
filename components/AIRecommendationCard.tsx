import styles from '@/styles/main'
import { AIRecommendation } from '@/types'
import { Lightbulb, TrendingUp, TriangleAlert } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

interface props{
    recommendation :  AIRecommendation
}

function AIRecommendationCard({recommendation}:props) {

  return (
   <View style = {[styles.dashboardCard, styles.w100, {marginBottom : 25}]}>
    <View style={[styles.flexRow]}>
        {
            recommendation.priority === "high" ?
            <TrendingUp color={styles.bg_success.backgroundColor} size={18}/>
            : recommendation.priority === "medium" ?
            <TriangleAlert color={styles.bg_danger.backgroundColor} size={18} />
            : <Lightbulb color={styles.bg_amber.backgroundColor} size={18}/>
        }
        <View style = {[styles.pill, styles.bg_success, {marginLeft : 10}]}>
            <Text style={[styles.pillText]}>{recommendation.priority + " priority"}</Text>
        </View>        
    </View>
    <View style = {{marginTop : 10}}>
        <Text style = {[styles.h5, styles.fontSemiBold]}>{recommendation.title}</Text>
        <Text style ={[styles.p, {marginTop : 10}]}>
            {recommendation.description}
        </Text>
    </View>
    <View style = {[styles.flexRow,styles.flexWrap ,{marginTop : 8,}]}>
        <Text style = {[{fontSize : 10}, styles.text_success, styles.fontSemiBold]}>Impact:</Text>
        <Text style = {[styles.p, {fontSize : 10}]}>{recommendation.impact}</Text>
    </View>
   </View>
  )
}

export default AIRecommendationCard