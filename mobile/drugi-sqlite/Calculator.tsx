import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export function Calculator({route, navigation}) { 
  const [distanceTravelled, setDistanceTravelled] = React.useState("");
  const [fuelBurned, setFuelBurned] = React.useState("");
  const [fuelPrice, setFuelPrice] = React.useState("");

  const validatedCalculation = (value: number) => {
    if (value === Infinity || isNaN(value)) {
      return 0;
    }
    return value;
  };

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log(event);
    
    if (event.type === 'set') {
      setShow(false);
    };
    
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const fuelPerHundredKm = validatedCalculation(Number(fuelBurned) / Number(distanceTravelled) * 100); 
  const currencyPerHundredKm = validatedCalculation(fuelPerHundredKm*Number(fuelPrice))
  return (
    <View style={styles.container}>
      <Text>Kalkulator Mobilne PS1</Text>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      {show && <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={date}
        onChange={onChange}
        mode={mode as any}
        is24Hour={true}
        display="default"
      />}
      <TextInput
        onChangeText={text => setDistanceTravelled(text)}
        value={distanceTravelled}
        keyboardType="number-pad"
        placeholder="Ilosc przejechanych km"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setFuelBurned(text)}
        value={fuelBurned}
        keyboardType="number-pad"
        placeholder="Spalone paliwo podczas jazdy (litry)"
        style={styles.formInput}
      />
      <TextInput
        onChangeText={text => setFuelPrice(text)}
        value={fuelPrice}
        keyboardType="number-pad"
        placeholder="Cena paliwa za litr"
        style={styles.formInput}
      />
      <Button
        title="Oblicz"
        onPress={() => navigation.push('Results', { fuelPerHundredKm, currencyPerHundredKm, date })}
      />
    </View>
  );
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

