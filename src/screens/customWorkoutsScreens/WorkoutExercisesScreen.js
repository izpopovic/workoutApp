import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { NavigationEvents } from "react-navigation";
import { Feather } from "react-native-vector-icons";

const WorkoutExercisesScreen = ({ navigation }) => {
  const receivedWorkout = navigation.getParam("workout");
  const { state, getWorkoutExercises } = useContext(CustomExercisesContext);

  const renderItem = item => (
    <ListItem
      title={item.exercise.name}
      subtitle={`${item.reps} x ${item.sets} - ${item.weight} kg`}
      bottomDivider
      //  onPress={() => {
      //    navigation.navigate("EditExercise", {exercise: item})
      //  }}
      rightIcon={() => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditExercise", { exercise: item });
            }}
          >
            <Feather name="edit" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        );
      }}
    />
  );

  return (
    <View>
      <View style={styles.titleContainer}>
        {/* <NavigationEvents
          onDidFocus={getWorkoutExercises(receivedWorkout.id)}
        /> */}
        <NavigationEvents
          onDidFocus={() => getWorkoutExercises(receivedWorkout.id)}
        />
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
