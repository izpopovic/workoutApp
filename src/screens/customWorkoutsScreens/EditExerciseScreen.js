import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Text, Button, ListItem, Tooltip, Input } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Context as ExerciseCategoriesContext } from "../../context/ExerciseCategoriesContext";
import { Feather } from "react-native-vector-icons";
import { NavigationEvents } from "react-navigation";

const EditExerciseScreen = ({ navigation }) => {
  const customExercises =  useContext(CustomExercisesContext);
  const exerciseCategories =  useContext(ExerciseCategoriesContext);

  const workoutExercise = navigation.getParam("exercise");
  // const exerciseCategories = navigation.getParam("categories");
  const [sets, setSets] = useState(String(workoutExercise.sets));
  const [reps, setReps] = useState(workoutExercise.reps);
  const [weight, setWeight] = useState(workoutExercise.weight);
  const [description, setDescription] = useState(workoutExercise.description);

  useEffect(() => {
    exerciseCategories.getExerciseCategories();

    return () => {
      customExercises.resetExercises();
    }
  }, []);

    return (
      <View>
        <Input
          label="Sets"
          value={sets}
          autoCorrect={false}
          onChangeText={newSets => {
            console.log(customExercises.state);
            setSets(newSets);
          }}
        />
        <Input
          label="Reps"
          value={reps}
          autoCorrect={false}
          onChangeText={newReps => {
            setReps(newReps);
          }}
        />
        <Input
          label="Weight"
          value={String(weight)}
          autoCorrect={false}
          onChangeText={newWeight => {
            setWeight(newWeight);
          }}
        />
        <Input
          label="Description"
          value={description}
          autoCorrect={false}
          onChangeText={newDescription => {
            setDescription(newDescription);
          }}
        />
        <Picker
          mode="dropdown"
          selectedValue=""
          style={{
            flexDirection: "row",
            justifyContent: "center",
            width: "80%",
            height: 40
          }}
        >
          {Object.keys(exerciseCategories.state).length > 0 && exerciseCategories.state.map(item => {
            return (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            );
          })}
        </Picker>
      </View>
    );
};

const styles = StyleSheet.create({});

export default EditExerciseScreen;
