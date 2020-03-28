import { View, Picker, Button, Text } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
export const Menu = ({ navigation }) => {
  const [season, setSeason] = useState("2019");
  const [round, setRound] = useState("1");
  let seasons = [];
  for (let i = 1950; i <= 2019; i++) {
    seasons.push(String(i));
  }
  return (
    <View>
      <Text>Sezon</Text>
      <Picker selectedValue={season} onValueChange={setSeason}>
        {seasons.map(season => (
          <Picker.Item label={season} value={season} />
        ))}
      </Picker>
      <Text>Runda</Text>
      <TextInput
        onChangeText={setRound}
        value={round}
        keyboardType="number-pad"
      />
      <Text>Przejdź do:</Text>
      <Button
        title="Wyniki wyścigów"
        onPress={() => {
          navigation.push("Races", { season, round });
        }}
      />
      <Button
        title="Klasyfikacja generalna"
        onPress={() => {
          navigation.push("Classification");
        }}
      />
      <Button
        title="Kierowcy"
        onPress={() => {
          navigation.push("Drivers");
        }}
      />
    </View>
  );
};
