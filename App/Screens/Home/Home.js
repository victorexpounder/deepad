import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './HomeStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import colors from '../../assets/colors/colors'
import EmptyHome from './EmptyHome'
import FilledHome from './FilledHome'
import notesDataMock from '../../notesDataMock'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNotes } from '../../contexts/NoteContext'
import { useFocusEffect } from '@react-navigation/native'

const Home = ({navigation}) => {
    const {container, bodyView, tabView, bodyContent, image, textCon, headText, subText} = styles
    const {storedNotes} = useNotes()
    const [notes, setNotes] = useState(storedNotes)
    
    const data = true

    useFocusEffect(
      React.useCallback(() => {
        setNotes(storedNotes)
        
      }, [])
    );

  return (
    <View style={container}>
      {data?
          <FilledHome navigation={navigation} notes={notes}/>
          :
          <EmptyHome/>

      }

    
    </View>
  )
}

export default Home