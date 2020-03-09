import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Feather } from "react-native-vector-icons";
import { EvilIcons } from "react-native-vector-icons";
// import Context from "../../context/CustomWorkoutContext";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { NavigationEvents } from "react-navigation";

let isLoading = true;

const WorkoutsMainScreen = ({ navigation }) => {
  const { state, getUserWorkouts, deleteUserWorkout } = useContext(
    CustomWorkoutContext
  );
  const exercisesContext = useContext(CustomExercisesContext);

  useEffect(() => {
    getUserWorkouts();
    isLoading = false;
  }, []);

  const renderItem = item => (
    <ListItem
      rightSubtitle={`${item.duration} min`}
      title={item.name}
      subtitle={`${item.description}`}
      bottomDivider
      onPress={async () => {
        await exercisesContext.getWorkoutExercises(item.id);
        navigation.navigate("WorkoutExercises", { workout: item });
      }}
      rightIcon={() => {
        return (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EditWorkout", { workout: item });
              }}
            >
              <Feather name="edit" style={{ fontSize: 28 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await deleteUserWorkout(item.id);
                await getUserWorkouts();
              }}
            >
              <EvilIcons name="trash" style={{ fontSize: 42, color: "red", paddingTop:10 }} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  if (isLoading === true) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 1
        }}
      >
        <ActivityIndicator size="large" color="#e3e3e3" />
      </View>
    );
  } else {
    return (
      <View>
        <View style={styles.titleContainer}>
          <Text h2 style={styles.workoutName}>
            Workouts
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
            <Feather name="plus-circle" style={styles.addWorkoutIcon} />
          </TouchableOpacity>
        </View>
        <>
          <FlatList
            on
            contentContainerStyle={styles.flatListContainer}
            data={Object.values(state)}
            keyExtractor={(item, index) => String(item.id)}
            renderItem={({ item }) => renderItem(item)}
          />
        </>
      </View>
    );
  }
};

WorkoutsMainScreen.navigationOptions = () => {
  return {
    header: null
  };
};
const styles = StyleSheet.create({
  headerIcon: {
    fontSize: 33,
    marginRight: 20
  },
  titleContainer: {
    marginTop: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 12
  },
  addWorkoutIcon: {
    fontSize: 35,
    alignSelf: "center",
    marginRight: 10,
    marginVertical: 10
  },
  flatListContainer: {
    paddingBottom: 135
  }
});

export default WorkoutsMainScreen;
