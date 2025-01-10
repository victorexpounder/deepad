import { View, Text, FlatList } from 'react-native'
import React from 'react'
import styles from './FilledHomeStyles'
import colors from '../../assets/colors/colors'
import NoteView from './NoteView'
import notesData from '../../notesData'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNotes } from '../../contexts/NoteContext'

const FilledHome = ({navigation, notes}) => {
    
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.noteList}>
        <FlatList 
        data={notes} 
        
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.category}  
        renderItem={({item})=>(
        <View style={styles.noteSec}>
            <View style={styles.noteHead}>
                <Text style={{fontSize: 15, fontWeight: '700'}}> {item.category} </Text>
                <Text style={{fontSize: 15, fontWeight: '500',  textDecorationLine: 'underline', color: colors.primary }}> View All</Text>
            </View>
            <FlatList 
            data={item.notes}
            
            keyExtractor={(item) => item.id} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item: {id, title, body, pinned, category}}) => (
               <NoteView navigation={navigation} id={id} title={title} desc={body} category={category} pinned={pinned} Pcategory={item.category} finish={false}/>
            )}>

            </FlatList>
        </View>

        )}>
        
        </FlatList>

        
      </View>
    </SafeAreaView>
  )
}

export default FilledHome