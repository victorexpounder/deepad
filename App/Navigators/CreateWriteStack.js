import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateNote from "../Screens/CreateNote/CreateNote";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../assets/colors/colors";
import { Button } from "react-native-paper";
import Write from "../Screens/Write/Write";

const Stack = createNativeStackNavigator();

const CreateWriteStack = () => {
    return (
      <Stack.Navigator
        
      >
        <Stack.Screen 
            name="WriteNote" 
            component={Write} 
            options={{
              headerBackTitle: 'Back',
              headerTitle: "New Notes",
              headerTintColor: colors.primary,
              
            }}
        />
        {/* Other screens for the CreateNote flow */}
      </Stack.Navigator>
    );
  };

  export default CreateWriteStack