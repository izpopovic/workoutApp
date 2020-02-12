import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import { Input, Button } from "react-native-elements";

const AddWorkoutScreen = ({ navigation }) => {
  const { state, addUserWorkout, getUserWorkouts } = useContext(
    CustomWorkoutContext
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  // EXTRACT THIS AND EDITWORKOUTSCREEN INTO ONE COMPONENT
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
        title="Add"
        onPress={() => {
          addUserWorkout(name, description, Number(duration));
          // getUserWorkouts();
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

export default AddWorkoutScreen;
