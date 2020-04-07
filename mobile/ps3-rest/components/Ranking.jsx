import { ErgastAPI } from "../API";
import { View, TextInput, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

export const Ranking = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [racesFiltered, setRacesFiltered] = useState("");
  const [races, setRaces] = useState([]);
  const { season, round } = route.params;
  useEffect(() => {
    ErgastAPI.getStandings(season).then(data => {
      console.log("ranking", data);
      setRaces(data);
      setSearch("");
      setRacesFiltered(data);
    });
  }, []);

  const updateFilteredRaces = searchTerm => {
    const filtered = races.filter(race => {
      const {
        Driver: { familyName }
      } = race;
      if (familyName.toLowerCase().includes(searchTerm)) return true;
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
  return (
    <TouchableOpacity style={{ borderWidth: 1, borderBottomColor: "#000000" }}>
      <Text>Nazwisko: {data.item.Driver.familyName}</Text>
      <Text>Punkty: {data.item.points}</Text>
      <Text>Wygrane: {data.item.wins}</Text>
      <Text>Stanowisko: {data.item.positionText}</Text>
    </TouchableOpacity>
  );
};
