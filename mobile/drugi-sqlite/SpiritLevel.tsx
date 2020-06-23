import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Accelerometer } from "expo-sensors";
export default (props) => {
  const [displacement, setDisplacement] = useState(["0", "0", "0"]);

  useEffect(() => {
    Accelerometer.addListener((newDisplacement) => {
      const { x, y, z } = newDisplacement;
      setDisplacement([x, y, z].map((dimension) => dimension.toPrecision(21)));
    });
    //kiedy komponent sie odrenderuje (destroy), posprzataj po akcelerometrze
    return () => Accelerometer.removeAllListeners();
  }, []);

  const { width, height } = Dimensions.get("window");
  const sumOfDisplacements = Number(displacement[0]) + Number(displacement[1]);
  return (
    <View
      style={{
        position: "absolute",
      }}
    >
      <Text
        style={{
          position: "relative",
          top: height / 2,
          fontWeight: "bold",
          fontSize: 30,
          textAlign: "center",
          width: width,
          color:
            sumOfDisplacements < 0.1 && sumOfDisplacements > -0.1
              ? "green"
              : "red",
        }}
      >
        {(Number(displacement[0]) + Number(displacement[1])).toPrecision(1)}
      </Text>
      <View
        style={{
          borderRadius: 50,
          width: 10,
          height: 10,
          position: "relative",
          top: height / 2 + ((Number(displacement[1]) + 0.08) * height) / 4,
          left: width / 2 - ((Number(displacement[0]) + 0.02) * width) / 4,
          backgroundColor:
            sumOfDisplacements < 0.1 && sumOfDisplacements > -0.1
              ? "green"
              : "red",
        }}
      />
      <View
        style={{
          borderRadius: 50,
          width: 10,
          height: 10,
          backgroundColor: "gray",
          position: "relative",
          top: height / 2,
          left: width / 2,
        }}
      />
    </View>
  );
};
