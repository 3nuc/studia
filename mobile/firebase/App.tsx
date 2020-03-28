import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Add } from "./Add";
import { Results } from "./Results";
import { List } from './List';
import { Details } from './Details';


const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List" 
          component={List}
        />
        <Stack.Screen
          name="Add" 
          component={Add}
        />
        <Stack.Screen
          name="Details" 
          component={Details}
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

