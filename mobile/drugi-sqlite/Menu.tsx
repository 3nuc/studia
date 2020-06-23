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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default ({ navigation: { push } }) => {
  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 40,
            textAlign: "center",
            marginBottom: 10,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            borderColor: "lightgray",
            opacity: 0.9,
          }}
        >
          Pomocnik Remontowy
        </Text>
        <View style={{ ...styles.button }}>
          <Button
            title="Znajdź fachowca"
            onPress={() => push("People (REST API)")}
            color="orange"
          />
        </View>
        <View style={{ ...styles.button }}>
          <Button
            title="Twoje remontowane pokoje"
            onPress={() => push("Rooms")}
            color="brown"
          />
        </View>
        <View style={{ ...styles.button }}>
          <Button
            title="Poziomica"
            onPress={() => push("Poziomica (Akcelerometr)")}
            color="crimson"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  button: { width: 200, marginBottom: 10 },
};
