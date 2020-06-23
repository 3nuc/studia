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
  Picker,
} from "react-native";
import { Person } from "./types";
import { getFavorites, updateRoom } from "./sqlite";

export const Room = ({ navigation, route }) => {
  const roomData = route.params.item;
  const [favorites, setFavorites] = useState([]);
  const [assigned, setAssigned] = useState(roomData.room.assigned);
  const [comment, setComment] = useState("");
  useEffect(() => {
    (async () => {
      const items = (await getFavorites()).map((x) => ({
        ...x,
        favorite: JSON.parse(x.favorite),
      }));
      setFavorites(items);
      console.log(items);
    })();
  }, []);
  console.log(roomData);
  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <View
          style={{
            backgroundColor: "white",
            margin: 10,
            padding: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ textAlign: "center" }}>Pokój</Text>
          <Text
            style={{ fontWeight: "bold", fontSize: 40, textAlign: "center" }}
          >
            {roomData.room.name}
          </Text>
          <View>
            <Text>Przypisany: {roomData.room.assigned}</Text>
            <Picker
              selectedValue={assigned}
              onValueChange={async (assigneeId) => {
                console.log("running");
                await updateRoom(
                  { ...roomData.room, assigned: assigneeId },
                  roomData.rowid
                );
                setAssigned(assigneeId);
              }}
            >
              {favorites.map((x) => (
                <Picker.Item
                  label={x.favorite.name.first + " " + x.favorite.name.last}
                  value={x.favorite.id.value}
                ></Picker.Item>
              ))}
              <Picker.Item label="Brak przypisania" value="" />
            </Picker>
          </View>
          <TextInput
            value={comment}
            placeholder="Dodaj komentarz"
            onChangeText={setComment}
          />
          <Button
            title="Dodaj komentarz"
            color="green"
            onPress={async () => {
              await updateRoom(
                {
                  ...roomData.room,
                  comments: roomData.room.comments
                    ? [...roomData.room.comments, comment]
                    : [],
                },
                roomData.rowid
              );
            }}
          />
          <View>
            {roomData.room.comments?.map((x) => (
              <Text
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "whitesmoke",
                  marginTop: 10,
                }}
              >
                {x}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
