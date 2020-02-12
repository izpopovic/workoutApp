import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Context as PredefinedWorkoutContext } from "../../context/PredefinedWorkoutContext";


const PredefinedDifficultyScreen = ({ navigation }) => {
  // id of Strength or Cardio (1 or 2)
  const { state, getWorkoutDays } = useContext(PredefinedWorkoutContext);
  const idWorkoutType = navigation.getParam("idWorkoutType");
  return (
    <>
      <Text>
        Predefined Difficulty Screen, Workout type id: {idWorkoutType}
      </Text>
      <Button
        title="Begginer"
        onPress={() => {
          // console.log(`PREDEFINED DIOFFICULTY SCREEN WORKOUT DAYS: ${getWorkoutDays(idWorkoutType, 1)}`)
          navigation.navigate("PredefinedDays", {
            idWorkoutType,
            idWorkoutDifficulty: 1
            // numOfWorkoutDays: getWorkoutDays(idWorkoutType, 1)
          });
        }}
      />
      <Button
        title="Intermediate"
        onPress={() =>
          navigation.navigate("PredefinedDays", {
            idWorkoutType,
            idWorkoutDifficulty: 2
          })
        }
      />
      <Button
        title="Advanced"
        onPress={() =>
          navigation.navigate("PredefinedDays", {
            idWorkoutType,
            idWorkoutDifficulty: 3
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default PredefinedDifficultyScreen;
