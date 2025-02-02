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
    const [refresh, setRefresh] = useState(false);
     
    
      const forceRefresh = () => {
        setRefresh(prev => !prev); // Toggle state to trigger a re-render
      };
    
      useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          forceRefresh();
        }, [])
      );

      const data = storedNotes.length > 0

  return (
    <View style={container}>
      {data?
          <FilledHome navigation={navigation} notes={notes} refresh={refresh} forceRefresh={forceRefresh}/>
          :
          <EmptyHome/>
      }

    
    </View>
  )
}

export default Home