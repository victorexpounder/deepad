import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import colors from "../assets/colors/colors";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const scheme = useColorScheme()
    const dark = scheme === 'dark'
    const unfocused = dark? '#fff' : '#222'
    return (
      <View style={{ flexDirection: 'row', height: 80, backgroundColor: dark? '#18042b' : colors.light, borderCenterRadius: 20, position: 'relative' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'CreateNote') {
                navigation.navigate('CreateNoteStack');
              } else {
                navigation.navigate(route.name);
              }
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          let iconComponent;
        switch (route.name) {
          case 'Home':
            iconComponent = (
              <MaterialCommunityIcons name={isFocused ? 'home-variant' : 'home-variant-outline'} size={25} color={isFocused ? '#673ab7' : unfocused} />
              
            );
            break;
          case 'Finished':
            iconComponent = (
              <MaterialCommunityIcons name={isFocused ? 'clipboard-check' : 'clipboard-check-outline'} size={25} color={isFocused ? '#673ab7' : unfocused} />
            );
            break;
          case 'CreateNote':
            iconComponent = (
              <MaterialCommunityIcons name="plus-circle" size={70} color={ '#673ab7' }  />
            );
            break;
          case 'Search':
            iconComponent = (
              <Ionicons name={isFocused ? 'search' : 'search-outline'} size={25} color={isFocused ? '#673ab7' : unfocused} />
            );
            break;
          case 'Settings':
            iconComponent = (
              <Ionicons name={isFocused ? 'settings' : 'settings-outline'} size={25} color={isFocused ? '#673ab7' : unfocused} />
            );
            break;
          default:
            break;
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            {label == 'CreateNote'? 
                <View style={{backgroundColor: dark? colors.darkBackground : colors.primaryBackground,  borderRadius: 50, position: 'absolute', top: -40, width: 'auto' }}>
                    {iconComponent} 
                </View>
                :
                
                <View style={{alignItems: 'center'}}>
                    {iconComponent}
                    <Text style={{ color: isFocused ? '#673ab7' : unfocused }}>{label}</Text>
                </View>
                

            }
            
          </TouchableOpacity>
        );
      })}

      </View>
    );
  };

  export default CustomTabBar;