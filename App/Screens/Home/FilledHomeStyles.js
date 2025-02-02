import { StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

const createStyles = (scheme) =>
  StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: scheme === 'dark'? colors.darkBackground : colors.primaryBackground, // ✅ Dynamic background color
    },
    noteList: {
      gap: 50,
      overflow: "auto",
    },
    noteSec: {
      gap: 20,
    },
    noteHead: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 25,
      paddingHorizontal: 15,
    },
  });

export default createStyles;
