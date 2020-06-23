import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Person } from "./types";
import { FlatList } from "react-native-gesture-handler";
import { createRoomTable, getRooms, removeRoom } from "./sqlite";
import { Ionicons } from "@expo/vector-icons";
export default ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const f = async () => {
      await createRoomTable();
      const items = (await getRooms()).map((x) => ({
        ...x,
        room: JSON.parse(x.room),
      }));
      setRooms(items as any);
    };
    f();
  }, []);
  return (
    <ImageBackground
      source={require("./assets/backdrop.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View>
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push("Room", { item })}
              onLongPress={() => {
                removeRoom(item.rowid);
                setRooms(rooms.filter((x) => x.rowid !== item.rowid));
              }}
            >
              <View
                style={{
                  padding: 10,
                  margin: 10,
                  backgroundColor: "white",
                  borderRadius: 20,
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  elevation: 12,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="md-home" size={24} color="gray" />
                  <Text style={{ marginLeft: 10 }}>{item.room.name}</Text>
                </View>
                <Ionicons name="ios-arrow-forward" size={24} color="gray" />
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={{ width: 120, margin: 10 }}>
          <Button
            title="Dodaj pokój"
            onPress={() => navigation.push("AddRoom")}
            color="green"
          />
        </View>
      </View>
    </ImageBackground>
  );
};
