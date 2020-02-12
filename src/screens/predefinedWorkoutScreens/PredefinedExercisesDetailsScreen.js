import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const PredefinedExercisesDetailsScreen = ({ navigation }) => {
  const exerciseWorkout = navigation.getParam("exerciseWorkout");

  return (
    <View>
      <Text>{exerciseWorkout.exercise.name}</Text>
      <Text>{exerciseWorkout.description}</Text>
      <Text>{exerciseWorkout.reps}</Text>
      <Text>{exerciseWorkout.sets}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title:{

  }
});

export default PredefinedExercisesDetailsScreen;
