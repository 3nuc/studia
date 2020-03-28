import { Item } from "./Races";
import { View, Text } from "react-native";
import React from "react";

export const Details = ({
  route: {
    params: { data }
  }
}) => {
  console.log("details", data);
  const {
    raceName,
    Circuit: { circuitName },
    time,
    Results
  } = data.item;
  const date = new Date(data.item.date).toLocaleString();
  const winner = Results[0].Driver.familyName;
  return (
    <View>
      <Text>Nazwa wydarzenia: {raceName}</Text>
      <Text>Nazwa toru: {circuitName}</Text>
      <Text>Data rozpoczecia: {date}</Text>
      <Text>Czas: {time}</Text>
      <Text>Zwycięzca: {winner}</Text>
    </View>
  );
};
