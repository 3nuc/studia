import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Calculator } from "./Calculator";
import { Results } from "./Results";


const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calculator" 
          component={Calculator}
        />
        <Stack.Screen
          name="Results" 
          component={Results}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  formInput: {
    width: 300,
    marginBottom: 10,
    borderWidth: 2,
    padding: 8,
    borderColor: '#5dceed',
    borderRadius: 5
  },
  result: {
    fontWeight: "700",
    fontSize: 20,
  }
});

