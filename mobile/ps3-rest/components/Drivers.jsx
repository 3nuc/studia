import { ErgastAPI } from "../API";
import { View, TextInput, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

export const Drivers = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [racesFiltered, setRacesFiltered] = useState("");
  const [races, setRaces] = useState([]);
  const { season, round } = route.params;
  useEffect(() => {
    ErgastAPI.getDrivers(season).then(data => {
      setRaces(data);
      setSearch("");
      setRacesFiltered(data);
    });
  }, []);

  const updateFilteredRaces = searchTerm => {
    console.log("ranking", races);
    const filtered = races.filter(driver => {
      const { familyName, givenName } = driver;
      if (
        [familyName, givenName]
          .join("")
          .toLowerCase()
          .includes(searchTerm)
      )
        return true;
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
    item: { familyName, givenName, nationality }
  } = data;
  return (
    <TouchableOpacity style={{ borderWidth: 1, borderColor: "#000000" }}>
      <Text>{`${familyName} ${givenName}`}</Text>
      <Text>Narodowosc:{nationality}</Text>
    </TouchableOpacity>
  );
};
