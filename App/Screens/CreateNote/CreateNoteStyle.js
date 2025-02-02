import { StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";


const CreateNotestyles = (dark) => StyleSheet.create({

    cnCon : {
        flex : 1,
        padding : 15,
    },
    HeadText: {
        fontSize: 28,
        fontWeight: '700',
        color: dark? '#fff' : ''
    }
})


export default CreateNotestyles