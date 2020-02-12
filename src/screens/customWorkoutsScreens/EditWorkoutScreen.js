import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
const EditWorkoutScreen = ({ navigation }) => {
  const { state, updateUserWorkout } = useContext(CustomWorkoutContext);
  const workout = navigation.getParam("workout");
  const [name, setName] = useState(String(workout.name));
  const [description, setDescription] = useState(String(workout.description));
  const [duration, setDuration] = useState(workout.duration);

  return (
    <View style={styles.container}>
      <Input
        label="Name"
        autoCorrect={false}
        value={name}
        onChangeText={newName => {
          setName(newName);
        }}
      />
      <Input
        label="Description"
        autoCorrect={false}
        value={description}
        onChangeText={newDescription => {
          setDescription(newDescription);
        }}
      />
      <Input
        label="Duration (min)"
        autoCorrect={false}
        value={String(duration)}
        keyboardType="numeric"
        onChangeText={newDuration => {
          setDuration(newDuration);
        }}
      />
      <Button
        title="Save"
        onPress={() => {
          updateUserWorkout(workout.id, name, description, duration);
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    // flex:1,
    justifyContent: "space-evenly",
    height: 300
  }
});

export default EditWorkoutScreen;
