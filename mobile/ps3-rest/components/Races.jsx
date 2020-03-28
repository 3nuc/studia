import { ErgastAPI } from "../API";
import { View, TextInput, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

export const Races = ({ navigation, season, round }) => {
  const [search, setSearch] = useState("");
  const [racesFiltered, setRacesFiltered] = useState("");
  const [races, setRaces] = useState([]);
  useEffect(() => {
    ErgastAPI.getRaces(season, round).then(data => {
      setRaces(data);
      setSearch("");
      setRacesFiltered(data);
    });
  }, []);

  const updateFilteredRaces = searchTerm => {
    const filtered = races.filter(race => {
      const {
        raceName,
        Circuit: { circuitName }
      } = race;
      if ([raceName, circuitName].join("").includes(searchTerm)) return true;
      return false;
    });

    if (!searchTerm) {
      setRacesFiltered(races);
    } else setRacesFiltered(filtered);
  };

  return (
    <View>
      <Text>Szukaj:</Text>
      <TextInput
        value={search}
        onChangeText={text => {
          setSearch(text);
          updateFilteredRaces(text);
        }}
        style={{ borderWidth: 1, borderColor: "#000000" }}
      />
      {races.length > 0 && (
        <FlatList
          data={racesFiltered}
          renderItem={data => Item({ data, navigation })}
          keyExtractor={({ round }) => round}
        />
      )}
    </View>
  );
};

export const Item = ({ data, navigation }) => {
  const {
    raceName,
    Circuit: { circuitName },
    time,
    Results
  } = data.item;
  const date = new Date(data.item.date).toDateString();
  const winner = Results[0].Driver.familyName;
  return (
    <TouchableOpacity
      onPress={() => navigation.push("Details", { data })}
      style={{ borderWidth: 1, borderBottomColor: "#000000" }}
    >
      <Text>Nazwa wydarzenia: {raceName}</Text>
      <Text>Nazwa toru: {circuitName}</Text>
      <Text>Data rozpoczecia: {date}</Text>
      <Text>Czas: {time}</Text>
      <Text>Zwycięzca: {winner}</Text>
    </TouchableOpacity>
  );
};
