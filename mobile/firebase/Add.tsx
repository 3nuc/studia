import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Platform, Picker } from "react-native";
import { SqliteService, GetCalculationResult } from './db';
import { BaseRouter } from "@react-navigation/native";
import { firebaseService } from "./firebase";

export function Add({ route, navigation }) {
  const db = firebaseService;

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
        placeholder="link do zdjęcia"
        style={styles.formInput}
      />
        <Picker style={{width:'50%'}}            
        selectedValue={fuelType}
        onValueChange={(itemValue) => {setFuelType(itemValue)}}>  
          <Picker.Item label="Benzyna" value="Benzyna"/>
          <Picker.Item label="Diesel" value="Diesel"/>
          <Picker.Item label="kWhs" value="kWhs"/>
        </Picker>
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
          db.setCar(vehicleName, photoUrl, 'diesel', fuelEfficiency, new Date().toISOString()).then((data) => {
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
