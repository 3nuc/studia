import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import { Person } from "./types";
import { Ionicons } from "@expo/vector-icons";
import { addFavorite, createTable, getFavorites } from "./sqlite";
export default ({ navigation, route }) => {
  const item = route.params.item as Person;

  const addToFavorite = async () => {
    console.log(await createTable());
    await addFavorite(item);
    console.log(await getFavorites());
    ToastAndroid.show("Dodano do ulubionych!", ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 30,
            margin: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={{ uri: item.picture.large }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <View
          style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        >
          <Text
            style={{ fontWeight: "bold", fontSize: 40 }}
          >{`${item.name.first} ${item.name.last}`}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="md-call"
                color="gray"
                style={{ marginRight: 10 }}
              />
              <Text>tel. {item.cell}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="md-build"
                color="gray"
                style={{ marginRight: 10, marginLeft: 10 }}
              />
              <Text>{item.profession}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="md-home"
                color="gray"
                style={{ marginLeft: -3, marginRight: 10 }}
              />
              <Text>{item.location.city}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 10 }}>E-mail: {item.email}</Text>
          <Text>
            Data rejestracji:{" "}
            {new Date(item.registered.date).toLocaleDateString()}
          </Text>
          <View style={{ marginTop: 10 }}>
            <Button
              title="Dodaj do ulubionych"
              color="green"
              onPress={addToFavorite}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
