import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import {Context as CustomExercisesContext} from "../../context/CustomExercisesContext";
import {Input, Button} from "react-native-elements";
const AddExerciseScreen = ({ navigation }) => {
  const {state, addWorkoutExercise} = useContext(CustomExercisesContext);
  const workoutId = navigation.getParam("workoutId");

  return (
    <View>
      <Input label="Reps"/>
      <Input label="Sets"/>
      <Input label="Weight"/>
      <Input label="Description"/>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddExerciseScreen;
