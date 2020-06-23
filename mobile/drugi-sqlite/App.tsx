import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Calculator } from "./Calculator";
import { Results } from "./Results";
import Person from "./Person";
import SpiritLevel from "./SpiritLevel";
import Menu from "./Menu";
import People from "./People";
import Rooms from "./Rooms";
import { createTable } from "./sqlite";
import { AddRoom } from "./AddRoom";
import { Room } from "./Room";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="People (REST API)"
          component={People}
          options={{ title: "Fachowcy" }}
        />
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={() => ({ title: "Pokoje" })}
        />
        <Stack.Screen
          name="AddRoom"
          component={AddRoom}
          options={({ route }) => ({ title: "Dodaj pokój" })}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ title: "Pokój" }}
        />
        <Stack.Screen
          name="Poziomica (Akcelerometr)"
          component={SpiritLevel}
          options={{ title: "Poziomica" }}
        />
        <Stack.Screen
          name="Person"
          component={Person}
          options={({ route }) => ({
            title:
              "Fachowiec: " +
              ((route.params as any).item as any).name.first +
              " " +
              ((route.params as any).item as any).name.last,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    width: 300,
    marginBottom: 10,
    borderWidth: 2,
    padding: 8,
    borderColor: "#5dceed",
    borderRadius: 5,
  },
  result: {
    fontWeight: "700",
    fontSize: 20,
  },
});
