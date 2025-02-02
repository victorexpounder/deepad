import { View, Text, useColorScheme } from 'react-native'
import React from 'react'
import colors from '../../assets/colors/colors'

const Search = () => {
  const colorscheme = useColorScheme()
  return (
    <View style={{backgroundColor: colorscheme ==='dark'? '#333' : '#fff', flex: 1}}>
      <Text>Search</Text>
    </View>
  )
}

export default Search