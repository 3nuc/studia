import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import { addRoom, createTable, createRoomTable } from "./sqlite";

export const AddRoom = ({ navigation }) => {
  const [name, setName] = useState("");

  const onAddRoom = async () => {
    await createTable();
    await createRoomTable();
    await addRoom({ name });
    navigation.goBack();
  };
  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <TextInput
          onChangeText={setName}
          style={{
            backgroundColor: "white",
            padding: 10,
            margin: 10,
            borderColor: "lightgray",
            borderRadius: 20,
            borderWidth: 1,
          }}
          placeholder="Nazwa pokoju..."
        />
        <View style={{ width: 120, margin: 10 }}>
          <Button title="Dodaj" onPress={onAddRoom} color="green" />
        </View>
      </View>
    </ImageBackground>
  );
};
