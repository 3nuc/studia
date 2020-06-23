import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  TouchableOpacity: {
    borderRadius: 10,
    borderColor: "#696969",
    margin: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    backgroundColor: "#ffecd3",
    textAlign: "center",
    padding: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  searchbox: {
    borderRadius: 10,
    margin: 30,
    height: 40,
    textAlign: "center",
    borderColor: "orange",
    borderWidth: 1,
    backgroundColor: "white",
    shadowOffset: { height: 2, width: 2 },
    shadowColor: "black",
    shadowRadius: 5
  }
});
