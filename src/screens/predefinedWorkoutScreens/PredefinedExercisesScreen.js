import React, { useContext } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { ListItem, Button, Text, Tooltip } from "react-native-elements";
import { Context as PredefinedWorkoutContext } from "../../context/PredefinedWorkoutContext";
import { Feather } from "react-native-vector-icons";
import { NavigationEvents } from "react-navigation";

const PredefinedExercisesScreen = ({ navigation }) => {
  const { state, getPredefinedExercises } = useContext(
    PredefinedWorkoutContext
  );
  const workoutDifficultyId = navigation.getParam("idWorkoutDifficulty");
  const workoutTypeId = navigation.getParam("idWorkoutType");
  const workoutDay = navigation.getParam("workoutDay");

  const renderItem = item => (
    <ListItem
      title={item.exercise.name}
      subtitle={`${item.sets} x ${item.reps}`}
      bottomDivider
      rightIcon={() => {
        console.log(item.description);
        if (item.description === "") {
          return null;
        } else {
          return (
            <Tooltip
              popover={<Text style={{ margin: 5 }}>{item.description}</Text>}
              backgroundColor="rgba(250, 250, 250, 0.99)"
            >
              <Feather name="info" style={{ fontSize: 20 }} />
            </Tooltip>
          );
        }
      }}
    />
  );
  // console.log(state.name);

  // its only one object with state.name thats why we can do it
  if (state.name === undefined) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 1
        }}
      >
        <ActivityIndicator size="large" color="#e3e3e3" />
        <NavigationEvents
          onWillFocus={() =>
            getPredefinedExercises(
              workoutTypeId,
              workoutDifficultyId,
              workoutDay
            )
          }
          on
        />
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text h2 style={styles.workoutName}>
            {state.name}
          </Text>
          <Tooltip
            popover={<Text style={{ margin: 5 }}>{state.description}</Text>}
            backgroundColor="rgba(250, 250, 250, 0.99)"
          >
            <Feather name="info" style={styles.titleIcon} />
          </Tooltip>
        </View>
        <FlatList
          data={state.exerciseWorkouts}
          keyExtractor={exerciseWorkout => String(exerciseWorkout.id)}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  workoutName: {
    alignSelf: "flex-start",
    marginVertical: 20,
    marginLeft: 12
  },
  titleContainer: {
    flexDirection: "row",
    // borderWidth:1,
    // borderColor:"black",
    justifyContent: "space-between"
  },
  titleIcon: {
    fontSize: 32,
    marginTop: 30,
    marginRight: 10
  }
});

export default PredefinedExercisesScreen;
