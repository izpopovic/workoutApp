import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import { NavigationEvents } from "react-navigation";
import { Feather } from "react-native-vector-icons";

const WorkoutExercisesScreen = ({ navigation }) => {
  // const { state, getWorkoutExercises } = useContext(CustomWorkoutContext);
  const receivedWorkout = navigation.getParam("workout");
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.workoutName}>{receivedWorkout.name}</Text>
      <TouchableOpacity onPress = {() => navigation.navigate("AddExercise")}>
        <Feather name="plus-circle" style={styles.addExerciseIcon}/>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 12
  },
  addExerciseIcon: {
    fontSize: 32,
    alignSelf: "center",
    marginRight: 10
  },
  workoutName: {
    fontSize: 22,
    fontWeight: "bold"
  }
});

export default WorkoutExercisesScreen;
