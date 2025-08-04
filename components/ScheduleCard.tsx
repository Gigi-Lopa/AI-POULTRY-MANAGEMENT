import styles from '@/styles/main';
import { CheckCircle, Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

const ScheduleCard = () => {
   const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style = {[styles.w100, styles.poultryCard, styles.rounded, styles.bg_white]}>
        <View style = {[styles.flexRow, styles.justifyBetween]}>
            <View style ={ [styles.w40]}>
                <View style= {styles.flexRow}>
                    <View style = {[styles.selfCenter, styles.flexRow, {marginRight: 5}]}>
                        <Clock size={15} color={ styles.bg_purple.backgroundColor}/>
                    </View>
                    <View style= {{marginRight : 15}}>
                        <Text style = {[styles.h4, {marginTop :5}]}>06:00</Text>
                    </View>
                    <View style={[styles.flexRow, styles.selfCenter]}>
                        <View style = {[styles.pill, styles.bg_success]}>
                            <Text style = {[ styles.pillText, styles.selfCenter]}>Healthy</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style = {[styles.w40, , styles.flexRow, styles.justifyEnd]}>
                <CheckCircle size = {15} color = {styles.text_success.color}/>
            </View>
        </View>
        <View style = {styles.borderBottom}>
            <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Flock: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>Flock One </Text>
            </View>
               <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Feed: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>Pallets </Text>
            </View>
               <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Amount: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>I5 Kgs </Text>
            </View>
        </View>
        <View style={styles.flexRow}>
            <Switch
                trackColor={{false: '#bbbbbbff', true: styles.bg_purple_30.backgroundColor}}
                thumbColor={isEnabled ? styles.bg_purple.backgroundColor : '#f4f3f4'}
                ios_backgroundColor="#bbbbbbff"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text style={[styles.h6, styles.selfCenter, {marginLeft : 10}]}>Notification</Text>
      </View>
    </View>
  )
}

export default ScheduleCard