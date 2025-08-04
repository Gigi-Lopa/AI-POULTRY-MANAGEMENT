import styles from '@/styles/main'
import { Bird, Calendar, Edit, LocateIcon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const FlockCard = () => {
  return (
    <View style = {[styles.poultryCard, styles.rounded, styles.bg_white]}>
        <View style = {[styles.flexRow, styles.justifyBetween]}>
            <Text style = {[styles.h4, styles.fontBold]}>Layer Flock A</Text>
            <Edit size ={15}/>
        </View>
        <Text style = {[styles.p]}>Cornish Bread9</Text>
        
        <View style = {[styles.w100, styles.flexRow, styles.justifyBetween, {marginTop : 5}]}>
            <View style = {[styles.w40, styles.flexRow]}>
                <Bird size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_success.backgroundColor} />
                <Text style = {styles.flockCardText}>105 Birds</Text>
            </View>
            <View style = {[styles.w40, styles.flexRow, , styles.justifyEnd]}>
                <Calendar size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_success.backgroundColor} />
                <Text style = {styles.flockCardText}>6 Weeks</Text>
            </View>
        </View>

        <View style = {[styles.w100, styles.flexRow, styles.justifyBetween, {marginTop : 15}]}>
            <View style = {[styles.w40, styles.flexRow]}>
                <LocateIcon size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_amber.backgroundColor} />
                <Text style = {styles.flockCardText}>Coup 2</Text>
            </View>
            <View style = {[styles.w40, styles.flexRow, styles.justifyEnd]}>
                <View style = {[styles.bg_success, styles.pill]}>
                    <Text style = {[ styles.pillText, styles.selfCenter]}>Healthy</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default FlockCard