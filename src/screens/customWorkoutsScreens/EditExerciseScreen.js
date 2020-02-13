import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, ListItem, Tooltip, Input } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Feather } from "react-native-vector-icons";

const EditExerciseScreen = ({ navigation }) => {
  const { state, editWorkoutExercise } = useContext(CustomExercisesContext);
  const workoutExercise = navigation.getParam("exercise");
console.log(workoutExercise)
  const [sets, setSets] = useState(String(workoutExercise.sets));
  const [reps, setReps] = useState(workoutExercise.reps);
  const [weight, setWeight] = useState(workoutExercise.weight);
  const [description, setDescription] = useState(workoutExercise.description);

  return (
    <View>
      <Input
        label="Sets"
        value={sets}
        autoCorrect={false}
        onChangeText={newSets => {
          setSets(newSets);
        }}
      />
      <Input
        label="Reps"
        value={reps}
        autoCorrect={false}
        onChangeText={newReps => {
          setReps(newReps);
        }}
      />
      <Input
        label="Weight"
        value={String(weight)}
        autoCorrect={false}
        onChangeText={newWeight => {
          setWeight(newWeight);
        }}
      />
      <Input
        label="Description"
        value={description}
        autoCorrect={false}
        onChangeText={newDescription => {
          setDescription(newDescription);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditExerciseScreen;
