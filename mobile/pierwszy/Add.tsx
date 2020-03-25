import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Platform } from "react-native";
import { SqliteService, GetCalculationResult } from './db';
import { BaseRouter } from "@react-navigation/native";

export function Add({ route, navigation }) {
  const db = new SqliteService();

  const [vehicleName, setVehicleName] = React.useState("Ford")
  const [photoUrl, setPhotoUrl] = React.useState("https://images.unsplash.com/photo-1489824904134-891ab64532f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80")
  const [distanceTravelled, setDistanceTravelled] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [fuelEfficiency, setFuelEfficiency] = React.useState("0");

  return (
    <View style={styles.container}>
      <Text>Kalkulator Mobilne PS1</Text>
      <TextInput
        onChangeText={text => setVehicleName(text)}
        value={vehicleName}
        keyboardType="number-pad"
        placeholder="Spalone paliwo podczas jazdy (litry)"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setPhotoUrl(text)}
        value={photoUrl}
        keyboardType="number-pad"
        placeholder="Cena paliwa za litr"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setFuelType(text)}
        value={fuelType}
        keyboardType="number-pad"
        placeholder="Cena paliwa za litr"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setFuelEfficiency(text)}
        value={fuelEfficiency}
        keyboardType="number-pad"
        placeholder="Cena paliwa za litr"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setDistanceTravelled(text)}
        value={distanceTravelled}
        keyboardType="number-pad"
        placeholder="Ilosc przejechanych km"
        style={styles.formInput}
      />
      <Button
        onPress={() => {
          db.addCalculation(vehicleName, photoUrl, 'diesel', fuelEfficiency, new Date().toISOString()).then((data) => {
            console.log('xd')
            navigation.push("List");
          }).catch(e => console.log(e))
        }}
        title="Dodaj"
      />
    </View>
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
