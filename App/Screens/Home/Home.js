import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'

import styles from './HomeStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import colors from '../../assets/colors/colors'
import EmptyHome from './EmptyHome'
import FilledHome from './FilledHome'
import notesDataMock from '../../notesDataMock'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({navigation}) => {
    const {container, bodyView, tabView, bodyContent, image, textCon, headText, subText} = styles
    const data = true

    const loadNote = async () => {
      try {
        const savedNote = await AsyncStorage.getItem('userNote');
        if (savedNote !== null) {
          console.log(JSON.parse(savedNote)); 
        }
        return '';
      } catch (error) {
        console.error('Failed to load note:', error);
        return '';
      }
    };
    const saveNote = async (notes) => {
      try {
        await AsyncStorage.setItem('userNote', JSON.stringify(notes));
        console.log('Note saved!');
        loadNote()
      } catch (error) {
        console.error('Failed to save note:', error);
      }
    };
    
    useEffect(()=>{
        loadNote()
        
    }, [])
  return (
    <View style={container}>
      {data?
          <FilledHome/>
          :
          <EmptyHome/>

      }

    
    </View>
  )
}

export default Home