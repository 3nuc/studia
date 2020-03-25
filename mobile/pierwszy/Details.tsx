import {View, Text, Image} from 'react-native'
import React from "react";
export function Details ({ navigation, route }) {
  
  const { car_name, creation_date, fuel_efficiency, fuel_type, image_url } = route.params;

  return (
    <View style={{display:"flex", alignItems: "center"}}>
      <Image source={{ uri: image_url }} style={{width: 200, height: 200}}></Image>
      <Text>Nazwa: {car_name}</Text>
      <Text>Utworzono: {creation_date}</Text>
      <Text>Wydajnośc: {fuel_efficiency} l/km</Text>
      <Text>Rodzaj paliwa: {fuel_type}</Text>
      <Text>{car_name}</Text>
      <Text>{car_name}</Text>
    </View>
  )

}