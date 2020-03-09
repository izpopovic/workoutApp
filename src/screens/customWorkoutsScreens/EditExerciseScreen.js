import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text, Button, ListItem, Tooltip, Input } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Context as ExerciseCategoriesContext } from "../../context/ExerciseCategoriesContext";
import { Context as ExercisesByCategoryContext } from "../../context/ExercisesByCategoryContext";
import { Feather } from "react-native-vector-icons";
import { NavigationEvents } from "react-navigation";
import Spacer from "../../components/Spacer";

const EditExerciseScreen = ({ navigation }) => {
  const exercises = useContext(CustomExercisesContext);

  const workoutExercise = navigation.getParam("exercise");
  const workoutId = navigation.getParam("workoutId");
  const exerciseId = workoutExercise.id;
  const [sets, setSets] = useState(String(workoutExercise.sets));
  const [reps, setReps] = useState(workoutExercise.reps);
  const [weight, setWeight] = useState(workoutExercise.weight);
  const [description, setDescription] = useState(workoutExercise.description);

  const [isLoading, setIsLoading] = useState(false);

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
      <View style={styles.container}>
        <Spacer>
          <Input
            label="Sets"
            value={sets}
            autoCorrect={false}
            onChangeText={newSets => {
              setSets(newSets);
            }}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Reps"
            value={reps}
            autoCorrect={false}
            onChangeText={newReps => {
              setReps(newReps);
            }}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Weight"
            keyboardType="decimal-pad"
            value={weight === 0 ? "" : String(weight)}
            autoCorrect={false}
            onChangeText={newWeight => {
              setWeight(newWeight);
            }}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Description"
            value={description}
            autoCorrect={false}
            onChangeText={newDescription => {
              setDescription(newDescription);
            }}
          />
        </Spacer>
        <View style={styles.addBtnContainer}>
          <View style={{ width: "35%" }}>
            <Button
              title="Save"
              type="solid"
              style={styles.btnSave}
              onPress={async () => {
                setIsLoading(true);
                await exercises.updateWorkoutExercise(
                  workoutId,
                  exerciseId,
                  reps,
                  sets,
                  weight,
                  description
                );

                await exercises.getWorkoutExercises(workoutId);

                navigation.pop();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  addBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default EditExerciseScreen;
