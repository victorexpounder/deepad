import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Landing from './Screens/Landing/Landing';
import Profile from './Screens/Profile';
import Home from './Screens/Home/Home';
import StackNavigator from './Navigators/StackNavigator';
import TabNavigator from './Navigators/TabNavigator';

import CreateNote from './Screens/CreateNote/CreateNote';
import colors from './assets/colors/colors';
import Write from './Screens/Write/Write';
import { PaperProvider } from 'react-native-paper';
import { NotesProvider } from './contexts/NoteContext';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <PaperProvider>
      <NotesProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='StartScreen'>
            <Stack.Screen
              name="StartScreen"
              component={StackNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen 
              name="CreateNoteStack" 
              component={CreateNote} 
              options={{
                headerBackTitle: 'Back',
                headerTitle: "New Notes",
                headerTintColor: colors.primary,
                
              }}
            />

            <Stack.Screen 
              name="WriteNote" 
              component={Write} 
              options={({navigation})=>({
                headerBackTitle: 'Back',
                headerTitle: "",
                headerTintColor: colors.primary, 
                headerRight : ()=>(
                  <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={{ color: colors.primary }}>Done</Text>
                  </TouchableOpacity>
                )
                
              })}
            />

            <Stack.Screen
              name="Dashboard"
              component={TabNavigator}
              options={{
                headerShown: false,
              }}
            />

          </Stack.Navigator>

          
        </NavigationContainer>
      </NotesProvider>
    </PaperProvider>
  );
}


