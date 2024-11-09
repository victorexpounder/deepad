import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateNote from "../Screens/CreateNote/CreateNote";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../assets/colors/colors";
import { Button } from "react-native-paper";

const Stack = createNativeStackNavigator();

const CreateNoteStack = () => {
    return (
      <Stack.Navigator
        
      >
        <Stack.Screen 
            name="CreateNote" 
            component={CreateNote} 
            options={{
              headerLeft: () => (
                <Button 
                  onPress={() => alert('This is a button!')}
                  
                  buttonColor="blue"
                  textColor="#000"
                
                > hii </Button>
              ),
            }}
        />
        {/* Other screens for the CreateNote flow */}
      </Stack.Navigator>
    );
  };

  export default CreateNoteStack