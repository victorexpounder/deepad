import { View, Text, FlatList, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './FilledHomeStyles'
import colors from '../../assets/colors/colors'
import NoteView from './NoteView'
import notesData from '../../notesData'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNotes } from '../../contexts/NoteContext'
import notesDataMock from '../../notesDataMock'
import { useFocusEffect } from '@react-navigation/native'
import Menu from '../../Components/Menu'
import createStyles from './FilledHomeStyles'

const FilledHome = ({navigation, notes, refresh, forceRefresh}) => {
  const scheme = useColorScheme()
  const styles = createStyles(scheme)
    
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.noteList}>
        <FlatList 
        data={notesDataMock} 
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.category}  
        renderItem={({item})=>(
        <View style={styles.noteSec}>
            <View style={styles.noteHead}>
                <Text style={{fontSize: 15, fontWeight: '700', color: scheme==='dark'? '#fff': ''}}> {item.category} </Text>
                <Text style={{fontSize: 15, fontWeight: '500',  textDecorationLine: 'underline', color: colors.primary }}> View All</Text>
            </View>
            <FlatList 
            data={[...notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))}
            extraData={refresh}
            keyExtractor={(item) => item.id} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item: {id, title, body, pinned, category}}) => {
              const shouldRender = 
              (pinned && item.category === 'Pinned Notes') || 
              (!pinned && category === item.category)

               return shouldRender &&(
                 <NoteView
                   refresh={forceRefresh} 
                   navigation={navigation} 
                   id={id} 
                   title={title} 
                   desc={body} 
                   category={category} 
                   pinned={pinned} 
                   Pcategory={item.category} 
                   finish={false}
                   />
               )
            }}>

            </FlatList>
        </View>

        )}>
        
        </FlatList>

        
      </View>

      
    </SafeAreaView>
  )
}

export default FilledHome