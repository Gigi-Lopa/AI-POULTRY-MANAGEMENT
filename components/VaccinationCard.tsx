import styles from '@/styles/main'
import { VaccinationRecord } from '@/types'
import { HeartPlus, Trash } from 'lucide-react-native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface props{
    vaccination : VaccinationRecord;
    onDelete:(id: string) => void
}
export default function VaccinationCard({vaccination, onDelete}: props) {
  
  return (
    <View style = {[styles.w100, styles.poultryCard, styles.rounded, styles.bg_white , {marginBottom : 10}]}>
        <View style = {[styles.flexRow, styles.justifyBetween, styles.borderBottom, {marginBottom : 10, paddingBottom:10}]}>
            <View style ={ [styles.w40]}>
                <View style= {styles.flexRow}>
                    <View style = {[styles.selfCenter, styles.flexRow, {marginRight: 5}]}>
                        <HeartPlus size={15} color={ styles.bg_purple.backgroundColor}/>
                    </View>
                    <View style= {{marginRight : 15}}>
                        <Text style = {[styles.h4, {marginTop :5}]}>{vaccination.flockName}</Text>
                    </View>
                </View>
            </View>
            <View style = {[styles.w40, , styles.flexRow, styles.justifyEnd, styles.selfCenter]}>
                <TouchableOpacity onPress={()=> onDelete(vaccination._id ?? "")}>
                    <Trash size = {15} color = {styles.text_danger.color}/>
                </TouchableOpacity>
            </View>
        </View>
       <View>
            <View style={[styles.flexRow,styles.flexWrap]}>
                <Text style={[styles.h6, styles.fontBold]}>Vaccine Name: </Text>
                <Text style={[styles.h6, { flexShrink: 1, marginLeft: 5 }]}>
                    {vaccination.vaccineName}
                </Text>
            </View>

            <View style={[styles.flexRow,styles.flexWrap]}>
                <Text style={[styles.h6, styles.fontBold]}>Vaccine Type: </Text>
                <Text style={[styles.h6, { flexShrink: 1, marginLeft: 5 }]}>
                    {vaccination.vaccineType}
                </Text>
            </View>

            <View style={[styles.flexRow,styles.flexWrap]}>
                <Text style={[styles.h6, styles.fontBold]}>Manufacturer: </Text>
                <Text style={[styles.h6, { flexShrink: 1, marginLeft: 5 }]}>
                Zoetis
                </Text>
            </View>

            <View style={[styles.flexRow,styles.flexWrap]}>
                <Text style={[styles.h6, styles.fontBold]}>Dosage: </Text>
                <Text style={[styles.h6, { flexShrink: 1, marginLeft: 5 }]}>
                {vaccination.dosage}
                </Text>
            </View>

            <View style={[styles.flexRow,styles.flexWrap]}>
                <Text style={[styles.h6, styles.fontBold]}>Route: </Text>
                <Text style={[styles.h6, { flexShrink: 1, marginLeft: 5 }]}>
                {vaccination.route}
                </Text>
            </View>
        </View>
      </View>
    )
}
