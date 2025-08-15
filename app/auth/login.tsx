import styles from '@/styles/main'
import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const login = () => {
  // change overcontent get flocks static ID 
  return (
    <View style = {[styles.screen, styles.container]}>
        <View style = {[styles.h60, styles.centerItems]}>
            
            <View style = {[styles.formGroup]}>
                <Text>Username</Text>
                <TextInput
                  style = {[styles.defaultInput]}  
                />
            </View>
        </View>
        <View>
            <TouchableOpacity style ={[styles.button]}>
                <Text style = {[styles.buttonText]}>Log in</Text>
            </TouchableOpacity>
            <Text style = {[styles.textCenter]}> {`${"<"} Go Back`}</Text>
        </View>
    </View>
  )
}

export default login