import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import styles from '../Home/HomeStyles'
import FinishedEmpty from './FinishedEmpty'
import FinishedFilled from './FinishedFilled'
import { StatusBar } from 'expo-status-bar'
import colors from '../../assets/colors/colors'
import { useNotes } from '../../contexts/NoteContext'
import { useFocusEffect } from '@react-navigation/native'

const Finished = () => {
  const {container, bodyView, tabView, bodyContent, image, textCon, headText, subText} = styles
  const empty = false
  const {storedNotes} = useNotes()
      
      
  
      useEffect(() => {
        console.log('storedNotes changed:', storedNotes);
      }, []);

      
  return (
    <View style={{flex: 1}}>
      {empty?
        <FinishedEmpty/>
        :
        <FinishedFilled/>
      }
     
    </View>
  )
}

export default Finished