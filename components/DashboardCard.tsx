import styles from '@/styles/main'
import { LucideIcon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

interface DashboardCardProps{
  name : string,
  value : string | number,
  Icon :LucideIcon,
}
const DashboardCard = ({Icon, name, value}:DashboardCardProps) => {
  return (
    <View style = {[styles.dashboardCard, styles.w40]}>
      <View style = {[styles.flexRow]}>
        <View style = {styles.selfCenter}>
          <Icon color={styles.bg_success.backgroundColor} size={25} style = {[styles.selfCenter]}/>
        </View>
        <View style = {[{marginLeft : 10}, styles.flexColumn]}>
          <Text style = {[styles.p]}>{name}</Text>
          <Text style = {[styles.h3]}>{value}</Text>
        </View>
      </View>
    </View>
  )
}

export default DashboardCard