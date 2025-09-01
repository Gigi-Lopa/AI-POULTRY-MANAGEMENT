import styles from '@/styles/main'
import { FlockResponse } from '@/types'
import { Bird, Calendar, LocateIcon, Trash } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
interface prop{
    flock: FlockResponse,
    deleteFlock : (id: string) => void
}

const FlockCard = ({flock, deleteFlock}:prop) => {
  return (
    <View style = {[styles.poultryCard, styles.rounded, styles.bg_white]}>
        <View style = {[styles.flexRow, styles.justifyBetween]}>
            <View>
                <Text style = {[styles.h4, styles.fontBold]}>{flock.flockName}</Text>
                <Text style = {[styles.p]}>{flock.breedType}</Text>
                <Text style = {[styles.p]}>{flock.flockPurpose}</Text>

            </View>
            <TouchableOpacity onPress={()=>deleteFlock(flock._id)}>
                <Trash color={styles.bg_danger.backgroundColor} size ={15}/>
            </TouchableOpacity>
        </View>        
        <View style = {[styles.w100, styles.flexRow, styles.justifyBetween, {marginTop : 5}]}>
            <View style = {[styles.w40, styles.flexRow]}>
                <Bird size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_success.backgroundColor} />
                <Text style = {styles.flockCardText}>{flock.numberOfBirds} Birds</Text>
            </View>
            <View style = {[styles.w40, styles.flexRow, , styles.justifyEnd]}>
                <Calendar size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_success.backgroundColor} />
                <Text style = {styles.flockCardText}>{flock.age} Weeks</Text>
            </View>
        </View>

        <View style = {[styles.w100, styles.flexRow, styles.justifyBetween, {marginTop : 15}]}>
            <View style = {[styles.w40, styles.flexRow]}>
                <LocateIcon size={15} style={[styles.selfCenter, {marginRight : 10, marginTop :2}]} color={styles.bg_amber.backgroundColor} />
                <Text style = {styles.flockCardText}>{flock.locationCoop}</Text>
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