import useSchedule from '@/hooks/useSchedule';
import styles from '@/styles/main';
import { Schedule } from '@/types';
import { extractDays, extractTime } from '@/utils/utils';
import { Clock, Trash } from 'lucide-react-native';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';

interface props{
    isOffline : boolean | null,
    schedule: Schedule,
    deleteSchedule : (id: string) => void
}

const ScheduleCard = ({schedule, deleteSchedule, isOffline} : props) => {
    const [isEnabled, setIsEnabled] = useState(schedule.notify);
    const {updateNotification} = useSchedule();
    const scheduleTime = new Date(schedule.time); 
    const toggleSwitch = () => {
    setIsEnabled(prev => {
        const state  = !prev;
        setTimeout(() => {
            updateNotification(schedule._id, state);
        }, 1500);
        return state;
    });

};

  return (
    <View style = {[styles.w100, styles.poultryCard, styles.rounded, styles.bg_white]}>
        <View style = {[styles.flexRow, styles.justifyBetween]}>
            <View style ={ [styles.w40]}>
                <View style= {styles.flexRow}>
                    <View style = {[styles.selfCenter, styles.flexRow, {marginRight: 5}]}>
                        <Clock size={15} color={ styles.bg_purple.backgroundColor}/>
                    </View>
                    <View style= {{marginRight : 15}}>
                        <Text style = {[styles.h4, {marginTop :5}]}>{extractTime(scheduleTime)}</Text>
                    </View>
                    <View style={[styles.flexRow, styles.selfCenter]}>
                        <View style = {[styles.pill, styles.bg_success]}>
                            <Text style = {[ styles.pillText, styles.selfCenter]}>{extractDays(schedule.repeat)}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style = {[styles.w40, , styles.flexRow, styles.justifyEnd]}>
                <TouchableOpacity disabled = {isOffline ?? false} onPress={()=>deleteSchedule(schedule._id)}>
                    <Trash size = {15} color = {!isOffline ? styles.text_danger.color : styles.bg_danger_30.backgroundColor}/>
                </TouchableOpacity>
            </View>
        </View>
        <View style = {styles.borderBottom}>
            <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Flock: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>{schedule.flockName} </Text>
            </View>
               <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Feed: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>{schedule.feed} </Text>
            </View>
               <View style = {styles.flexRow}>
                <Text style = {[styles.h6, styles.fontBold]}>Amount: </Text>
                <Text style = {[styles.h6, {marginLeft: 5}]}>{schedule.amount} Kgs </Text>
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