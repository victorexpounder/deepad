import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors'
import styles from './CreateNoteStyle'
const {cnCon, HeadText} = styles
const CreateNote = ({navigation}) => {
  const listData = [
    {
      name: "Interesting Idea",
      desc: "Use free text area, feel free to write it all",
      icon: "lightbulb-outline",
      iconType: "material",
      bgColor: "#8B5CF6"
    },
    {
      name: "Buying Something",
      desc: "Use checklist, so you won't miss anything",
      icon: "cart-outline",
      iconType: "ionic",
      bgColor: "#4ADE80"
    },
    {
      name: "Goals",
      desc: "Near/future goals, notes and keep focus",
      icon: "star",
      iconType: "material",
      bgColor: "#F59E0B"
    },
    {
      name: "Guidance",
      desc: "Create guidance for routine activities",
      icon: "clipboard-text-outline",
      iconType: "material",
      bgColor: "#EF4444"
    },
    {
      name: "Routine Tasks",
      desc: "Checklist with sub-checklist",
      icon: "checkbox-marked-outline",
      iconType: "material",
      bgColor: "#BEF264"
    }
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        height: 78,
        backgroundColor: item.bgColor,
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
      }}
      onPress={() => navigation.navigate('WriteNote', {item})} 
    >
      <View style={{
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {item.iconType === 'material' ? (
          <MaterialCommunityIcons name={item.icon} size={24} color="white" />
        ) : (
          <Ionicons name={item.icon} size={24} color="white" />
        )}
      </View>
      <View style={{marginLeft: 16, flex: 1}}>
        <Text style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 4
        }}>
          {item.name}
        </Text>
        <Text style={{
          color: 'rgba(255,255,255,0.8)',
          fontSize: 14
        }}>
          {item.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: colors.light, flex: 1}}>
      <View style={cnCon}>
        <Text style={HeadText}>What Do You Want To Notes?</Text>
        <View style={{flex: 1}}>
          <FlatList
          data={listData} 
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          >

          </FlatList>
        </View>
      </View>
    </View>
  )
}

export default CreateNote