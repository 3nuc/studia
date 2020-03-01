
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export function Results({route, navigation}) {

  const { fuelPerHundredKm, currencyPerHundredKm } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        Wydajność:
      </Text>
      <Text style={styles.result}>
        {fuelPerHundredKm} l/100km
      </Text>
      <Text style={styles.result}>
        {currencyPerHundredKm} waluta/100km
      </Text>
      <Button onPress={()=>navigation.push('Calculator')} title="Powrót"/>
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
  result: {
    fontWeight: "700",
    fontSize: 20,
  }
});

