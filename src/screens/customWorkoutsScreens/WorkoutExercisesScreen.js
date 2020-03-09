import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { NavigationEvents } from "react-navigation";
import { Feather, EvilIcons } from "react-native-vector-icons";

const WorkoutExercisesScreen = ({ navigation }) => {
  const receivedWorkout = navigation.getParam("workout");
  const { state, getWorkoutExercises, deleteWorkoutExercise } = useContext(
    CustomExercisesContext
  );

  const renderItem = item => (
    <ListItem
      title={item.exercise.name}
      subtitle={`\nNumber of sets: ${item.sets}\n\nNumber of reps: ${item.reps}\n\nWeight [kg]: ${item.weight}\n\nDescription: ${item.description}\n`}
      bottomDivider
      rightIcon={() => {
        return (
          <View style={{ flexDirection: "column", alignItems: "center"}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditExercise", {
                  exercise: item,
                  workoutId: receivedWorkout.id
                });
              }}
            >
              <Feather name="edit" style={{ fontSize: 32 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await deleteWorkoutExercise(receivedWorkout.id, item.id);
                await getWorkoutExercises(receivedWorkout.id);
              }}
            >
              <EvilIcons name="trash" style={{ fontSize: 47 , color: "red", paddingTop:30 }} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.workoutName}>{receivedWorkout.name}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddExercise", {
              workoutId: receivedWorkout.id
            })
          }
        >
          <Feather name="plus-circle" style={styles.addExerciseIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={state}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
      />
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
    fontSize: 35,
    alignSelf: "center",
    marginRight: 10
  },
  workoutName: {
    fontSize: 22,
    fontWeight: "bold"
  },
  flatListContainer: {
    paddingBottom: 55
  }
});

export default WorkoutExercisesScreen;
