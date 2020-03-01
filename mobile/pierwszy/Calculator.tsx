import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

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
  const fuelPerHundredKm = validatedCalculation(Number(fuelBurned) / Number(distanceTravelled) * 100); 
  const currencyPerHundredKm = validatedCalculation(fuelPerHundredKm*Number(fuelPrice))
  return (
    <View style={styles.container}>
      <Text>Pomóżcie mi prosze juz nie daje rady</Text>
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
        onPress={() => navigation.push('Results', { fuelPerHundredKm, currencyPerHundredKm })}
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

