import { View,TextInput } from 'react-native'
import React from 'react'

export default function ToDo_Inputs(props) {
  return (
    <View>
      <TextInput 
      {...props}/>
    </View>
  )
}