import { View, Text, TouchableOpacity } from 'react-native'
import React, { memo, useState } from 'react'
import colors from '../../assets/colors/colors'
import Menu from '../../Components/Menu'
import MenuOptions from '../../Components/Menu'
import Animated, { BounceOut, FadeInDown, FadeInRight, FadeInUp, FadeOut, FadeOutRight, FadeOutUp, LinearTransition } from 'react-native-reanimated'

const NoteView = memo(({navigation, refresh,  id, title, desc, category, pinned, Pcategory, finish, finished}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const _exiting = FadeOutUp.springify().damping(14);
  const _entering = FadeInUp.springify().damping(14);
  const _layout = LinearTransition.springify().damping(14);

  const pickColor = () =>{
    if(category == 'Routine Tasks'){
      return colors.success
    }else if(category == 'Interesting Idea'){
      return colors.dimPrimary
    }else if(category == 'CheckList'){
      return colors.dimSecondary
    }else{
      return colors.secondary
    }
  }

  const Rcolor = pickColor()
  const bottomRadius = Pcategory == 'Pinned Notes'? 0 : 20



  return (
    <Animated.View
      entering={_entering}
      exiting={_exiting}
      layout={_layout}
      
    >
      {finish && (!finished || Pcategory == 'Pinned Notes')?
        ''
        :
        
        <TouchableOpacity style={{width: 230, marginLeft: 15}} onLongPress={()=> setMenuVisible(true)} onPress={()=> navigation.navigate('WriteNote', {id, category})}>
          <View style={{height: 250 ,backgroundColor: Rcolor, padding: 15, borderTopEndRadius: 20, borderTopStartRadius: 20, borderBottomStartRadius:bottomRadius, borderBottomEndRadius: bottomRadius, gap: 10}}>
            <Text style={{fontSize: 20, fontWeight: '600', textAlign: 'left'}}> {title} </Text>
            <Text style={{fontSize: 15, fontWeight: '400', textAlign: 'left', color: colors.darkGray}}> {desc} </Text>
          </View>
          {pinned && Pcategory == 'Pinned Notes' &&
            <View style={{backgroundColor: colors.primary, padding: 10, borderBottomEndRadius: 20, borderBottomStartRadius: 20}}>
                <Text style={{color: colors.light, fontSize: 15, }}> {category} </Text>
            </View>
  
          }
        </TouchableOpacity>
      }
      <MenuOptions refresh={refresh} visible={menuVisible} setVisible={setMenuVisible} id={id} pinned={pinned} />
    </Animated.View>
  )
})

export default NoteView

