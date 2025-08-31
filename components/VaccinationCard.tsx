import styles from '@/styles/main'
import { HeartPlus, Trash } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function VaccinationCard() {
    /**
     "flockID": "FLOCK-001",
    "flockName": "Layer Batch A",
    "vaccineName": "Newcastle Disease Vaccine (Lasota)",
    "vaccineType": "Live attenuated",
    "manufacturer": "Zoetis",
    "dosage": "0.03 ml per bird",
    "route": "Eye drop", //(drinking water, injection, eye drop, spray, feed)
    }

     */
  return (
    <View style = {[styles.w100, styles.poultryCard, styles.rounded, styles.bg_white]}>
        <View style = {[styles.flexRow, styles.justifyBetween]}>
            <View style ={ [styles.w40]}>
                <View style= {styles.flexRow}>
                    <View style = {[styles.selfCenter, styles.flexRow, {marginRight: 5}]}>
                        <HeartPlus size={15} color={ styles.bg_purple.backgroundColor}/>
                    </View>
                    <View style= {{marginRight : 15}}>
                        <Text style = {[styles.h4, {marginTop :5}]}>Flock Layer C</Text>
                    </View>
                </View>
            </View>
            <View style = {[styles.w40, , styles.flexRow, styles.justifyEnd]}>
                <TouchableOpacity onPress={()=> console.log("")}>
                    <Trash size = {15} color = {styles.text_danger.color}/>
                </TouchableOpacity>
            </View>
            <View style = {styles.borderBottom}>
                <View style = {styles.flexRow}>
                    <Text style = {[styles.h6, styles.fontBold]}>Vaccine Name: </Text>
                    <Text style = {[styles.h6, {marginLeft: 5}]}>Newcastle Disease Vaccine (Lasota)</Text>
                </View>
                <View style = {styles.flexRow}>
                    <Text style = {[styles.h6, styles.fontBold]}>Vaccine Type: </Text>
                    <Text style = {[styles.h6, {marginLeft: 5}]}>Live attenuated</Text>
                </View>
                <View style = {styles.flexRow}>
                    <Text style = {[styles.h6, styles.fontBold]}>Manufacturer: </Text>
                    <Text style = {[styles.h6, {marginLeft: 5}]}>Zoetis </Text>
                </View>
                <View style = {styles.flexRow}>
                    <Text style = {[styles.h6, styles.fontBold]}>Dosage: </Text>
                    <Text style = {[styles.h6, {marginLeft: 5}]}>0.03 (ml per bird)</Text>
                </View>
                <View style = {styles.flexRow}>
                    <Text style = {[styles.h6, styles.fontBold]}>Route: </Text>
                    <Text style = {[styles.h6, {marginLeft: 5}]}>Eye drop</Text>
                </View>
            </View>
        </View>
      </View>
    )
}
