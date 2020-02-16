import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Text, Button, ListItem, Tooltip, Input } from "react-native-elements";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Context as ExerciseCategoriesContext } from "../../context/ExerciseCategoriesContext";
import { Context as ExercisesByCategoryContext } from "../../context/ExercisesByCategoryContext";
import { Feather } from "react-native-vector-icons";
import { NavigationEvents } from "react-navigation";

const EditExerciseScreen = ({ navigation }) => {
  const customExercises = useContext(CustomExercisesContext);

  // const exerciseCategories = useContext(ExerciseCategoriesContext);
  // const exercisesByCategory = useContext(ExercisesByCategoryContext);

  const workoutExercise = navigation.getParam("exercise");
  const workoutId = navigation.getParam("workoutId");
  const exerciseId = workoutExercise.id;
  // const exerciseCategories = navigation.getParam("categories");
  const [sets, setSets] = useState(String(workoutExercise.sets));
  const [reps, setReps] = useState(workoutExercise.reps);
  const [weight, setWeight] = useState(workoutExercise.weight);
  const [description, setDescription] = useState(workoutExercise.description);

  useEffect(() => {
    // exerciseCategories.getExerciseCategories();
    // exercisesByCategory.getExercisesByCategory(1);
    return () => {
      customExercises.resetExercises();
    };
  }, []);

  // const [selectedCategoryPicker, setSelectedCategoryPicker] = useState("");
  // const [selectedExercisePicker, setSelectedExercisePicker] = useState("");

  return (
    <View style={styles.container}>
      <Input
        label="Sets"
        value={sets}
        autoCorrect={false}
        onChangeText={newSets => {
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
      {/* <Picker
        mode="dropdown"
        selectedValue={selectedCategoryPicker}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "80%",
          height: 45,
          borderColor: "black",
          borderWidth: 3
        }}
        onValueChange={(itemValue, itemIndex) => {
          // console.log(`${itemIndex} - ${itemValue}`);
          setSelectedCategoryPicker(itemValue);
          console.log(`Selected category: ${itemValue}`);
          exercisesByCategory.getExercisesByCategory(itemIndex + 1);
        }}
      >
        {Object.keys(exerciseCategories.state).length > 0 &&
          exerciseCategories.state.map(item => {
            return (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            );
          })}
      </Picker>

      <Picker
        mode="dropdown"
        selectedValue={selectedExercisePicker}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "80%",
          height: 45,
          borderColor: "black",
          borderWidth: 3
        }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedExercisePicker(itemValue);
          console.log(`Selected exercise: ${itemValue}`);
        }}
      >
        {Object.keys(exercisesByCategory.state).length > 0 &&
          exercisesByCategory.state.map(item => {
            return (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            );
          })}
      </Picker> */}
      <Button
        title="Save"
        type="solid"
        style={styles.btnSave}
        onPress={async () => {
          await customExercises.updateWorkoutExercise(
            workoutId,
            exerciseId,
            reps,
            sets,
            weight,
            description
          );
          navigation.pop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  btnSave: {
    width: 200,
    height: 59
  }
});

export default EditExerciseScreen;
