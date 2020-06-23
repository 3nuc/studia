import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image,
  ListRenderItem,
  FlatList,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  ImageBackground,
} from "react-native";
import { Person } from "./types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const MyItem = ({ item, navigate }: { item: Person; navigate: any }) => {
  const onPress = () => {
    navigate.push("Person", { item });
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: "white",
          padding: 10,
          margin: 5,
          borderRadius: 10,
          shadowOffset: { height: 10, width: 10 },
          shadowColor: "black",
          shadowOpacity: 1,
          elevation: 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Image
            source={{ uri: item.picture.thumbnail }}
            style={{ width: 50, height: 50 }}
          />
          <View style={{ margin: 5 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
            >{`${item.name.first} ${item.name.last}`}</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-call"
                color="gray"
                style={{ marginRight: 10 }}
              />
              <Text>tel. {item.cell}</Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-build"
                color="gray"
                style={{ marginRight: 10 }}
              />
              <Text>{item.profession}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="ios-arrow-forward" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

type People = Person[] | null;

const decodeMd5ToUseAsProfession = (md5: string) => {
  const letterCode = md5.toLowerCase().charCodeAt(0);
  const zawody = [
    "Tynkarz",
    "Tapeciarz",
    "Malarz",
    "Złota rączka",
    "Hydraulik",
  ];
  const index = letterCode % 4;
  return zawody[index];
};

export default ({ navigation }) => {
  const [people, setPeople] = useState([] as Person[]);
  const [filteredPeople, setFilteredPeople] = useState([] as Person[]);
  // const [filterInput, setFilterInput] = useState([] as Person[]);
  const getPeople = () =>
    axios.get("https://randomuser.me/api", { params: { results: 100 } });

  useEffect(() => {
    getPeople().then(({ data: newPeople }: { data: { results: Person[] } }) => {
      const peopleWithProfession = newPeople.results.map((person) => ({
        ...person,
        profession: decodeMd5ToUseAsProfession(person.login.md5),
      }));
      setPeople(peopleWithProfession);
      setFilteredPeople(peopleWithProfession);
    });
  }, []);

  const onFilterInputChange = (newFilterInput: string) => {
    if (!newFilterInput) {
      setFilteredPeople(people);
      return;
    }
    const _filteredPeople = people.filter((person) =>
      JSON.stringify(person).toLowerCase().includes(newFilterInput)
    );
    setFilteredPeople(_filteredPeople);
  };

  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <Ionicons
            name="md-search"
            size={24}
            style={{ marginLeft: 12, marginRight: 12 }}
          />
          <TextInput
            onChangeText={onFilterInputChange}
            style={{
              backgroundColor: "white",
              margin: 10,
              padding: 10,
              alignSelf: "stretch",
              width: 350,
            }}
            placeholder="Wyszukaj fachowców..."
          />
        </View>
        <FlatList
          data={filteredPeople}
          renderItem={(itemData) => (
            <MyItem item={itemData.item} navigate={navigation} />
          )}
          keyExtractor={(item) => item.cell}
        />
      </View>
    </ImageBackground>
  );
};
