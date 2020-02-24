import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import { Context as PredefinedWorkoutContext } from "../../context/PredefinedWorkoutContext";
import { NavigationEvents } from "react-navigation";
import { setNavigator } from "../../navigationRef";

const PredefinedDaysScreen = ({ navigation }) => {
  // id of Strength or Cardio (1 or 2)
  const { state, getWorkoutDays, clearWorkoutDays } = useContext(
    PredefinedWorkoutContext
  );
  const idWorkoutType = navigation.getParam("idWorkoutType");
  const idWorkoutDifficulty = navigation.getParam("idWorkoutDifficulty");

  const views = [];

  useEffect(() => {
    const listener = navigation.addListener("didFocus", async () => {
      await getWorkoutDays(idWorkoutType, idWorkoutDifficulty);
    });
    return () => {
      listener.remove();
    };
  }, []);

  const renderButtons = () => {
    for (var i = 1; i <= state.numberOfDays; i++) {
      const workoutDay = 1;
      if (i > 1) {
        workoutDay = i;
      }
      views.push(
        <View style={styles.button} key={i}>
          <Button
            // key={i}
            onPress={() =>
              navigation.navigate("PredefinedExercises", {
                idWorkoutType,
                idWorkoutDifficulty: idWorkoutDifficulty,
                workoutDay
              })
            }
            title={`Day ${i}`}
            type="outline"
          />
        </View>
      );
    }
  };

  if (state.numberOfDays === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 200
        }}
      >
        <Text h1 style={{ color: "red" }}>
          Loading...
        </Text>
      </View>
    );
  } else {
    renderButtons();
    return (
      <View style={styles.buttonsContainer}>
        {/* <Text h3>Predefined Days Screen {state.numberOfDays}</Text> */}
        {views}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    marginTop: 50
  },
  button: {
    width: "70%",
    marginVertical: 35
  }
});

export default PredefinedDaysScreen;
