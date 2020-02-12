import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

const PredefinedMainScreen = ({ navigation }) => {
  return (
    <>
      <Text>Predefined Main Screen</Text>
      <Button
        title="STRENGTH"
        onPress={() =>
          navigation.navigate("PredefinedDifficulty", { idWorkoutType: 1 })
        }
      />
      <Button
        title="CARDIO"
        onPress={() =>
          navigation.navigate("PredefinedDifficulty", { idWorkoutType: 2 })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default PredefinedMainScreen;
