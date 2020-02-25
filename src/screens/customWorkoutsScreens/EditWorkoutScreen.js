import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
const EditWorkoutScreen = ({ navigation }) => {
  const { state, updateUserWorkout, getUserWorkouts } = useContext(
    CustomWorkoutContext
  );
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
        multiline={true}
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
      <View style={styles.saveBtnContainer}>
        <Button
          title="Save"
          onPress={() => {
            updateUserWorkout(workout.id, name, description, duration);
            getUserWorkouts();
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    justifyContent: "space-evenly",
    height: 300
  },
  saveBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default EditWorkoutScreen;
