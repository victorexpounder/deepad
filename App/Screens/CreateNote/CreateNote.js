import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../assets/colors/colors'
import styles from './CreateNoteStyle'
const {cnCon, HeadText} = styles
const CreateNote = () => {
  const listData = [
    {
      name : "Interesting Idea",
      desc: "Use free text area, feel free to write it all"
    },
    {
      name : "Interesting Idea",
      desc: "Use free text area, feel free to write it all"
    },
    {
      name : "Interesting Idea",
      desc: "Use free text area, feel free to write it all"
    },
    {
      name : "Interesting Idea",
      desc: "Use free text area, feel free to write it all"
    },
    {
      name : "Interesting Idea",
      desc: "Use free text area, feel free to write it all"
    }
  ]
  return (
    <View style={{backgroundColor: colors.light, flex: 1}}>
      <View style={cnCon}>
        <Text style={HeadText}>What Do You Want To Notes?</Text>
        <View style={{flex: 1}}>
          <FlatList
          data={listData} 
          showsVerticalScrollIndicator={false}
          
          renderItem={({item})=>(
            <View style={{ height: 78, backgroundColor: colors.primary, marginTop: 20, borderRadius: 10}}>
              <Text style={{color: '#000'}}>{item.name}</Text>
            </View>
          )}
          >

          </FlatList>
        </View>
      </View>
    </View>
  )
}

export default CreateNote