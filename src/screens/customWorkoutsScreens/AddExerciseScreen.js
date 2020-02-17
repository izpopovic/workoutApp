import React, { useContext, useState, useEffect, AsyncStorage } from "react";
import { View, StyleSheet, Text, Picker } from "react-native";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Context as ExerciseCategoriesContext } from "../../context/ExerciseCategoriesContext";
import { Context as ExercisesByCategoryContext } from "../../context/ExercisesByCategoryContext";
import { Context as IdExerciseContext } from "../../context/IdExerciseContext";
import { Input, Button } from "react-native-elements";
import workoutApi from "../../api/workoutApi";
import { NavigationEvents } from "react-navigation";
const AddExerciseScreen = ({ navigation }) => {
  // const { state, addWorkoutExercise, findExerciseIdByName } = useContext(
  //   CustomExercisesContext
  // );

  const workoutId = navigation.getParam("workoutId");

  const exercises = useContext(CustomExercisesContext);
  const exerciseCategories = useContext(ExerciseCategoriesContext);
  const exercisesByCategory = useContext(ExercisesByCategoryContext);
  const ludo = useContext(IdExerciseContext);

  const [selectedCategoryPicker, setSelectedCategoryPicker] = useState("");
  const [selectedExercisePicker, setSelectedExercisePicker] = useState(
    "Flat barbell bench press"
  );

  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");

  const getUserIdFromJwt = async () => {
    const token = await AsyncStorage.getItem("token");
    const decodedToken = JwtDecode(token);
    const userIdKey =
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    return { userId: decodedToken[userIdKey] };
  };

  // const [exerciseId, setExerciseId] = useState(0);

  // async function doSomething() {
  //   console.log("SMECE", selectedExercisePicker);
  //   return await exercises.findExerciseIdByName(selectedExercisePicker);
  // }
  // function getFirstUser() {
  //   return exercises
  //     .findExerciseIdByName(selectedExercisePicker)
  //     .then(function(users) {
  //       return users;
  //     });
  // }

  useEffect(() => {
    exerciseCategories.getExerciseCategories();
    // return () => {
    //   customExercises.resetExercises();
    // };
  }, []);

  // function waitForElement(id) {
  //   if (typeof id !== "undefined") {
  //     //variable exists, do what you want
  //     console.log("variable exists!!!");
  //   } else {
  //     console.log("Doesnt exist, wait for 250 ms");
  //     setTimeout(waitForElement, 250);
  //   }
  // }

  return (
    <View>
      {/* <NavigationEvents
        onDidFocus={() => exerciseCategories.getExerciseCategories()}
      /> */}
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
      <Picker
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
        onValueChange={async (itemValue, itemIndex) => {
          setSelectedExercisePicker(itemValue);
          // setExerciseId(findExerciseIdByName(selectedExercisePicker));
          // const id = await findExerciseIdByName(itemValue);
          // console.log("id:", id);
          // setExerciseId(id);
          console.log(`Selected exxxercise: ${itemValue} -- ${itemIndex}`);
          // ludo.findExerciseIdByName(itemValue);
          // waitForElement(ludo.state.id);
          // console.log("On value changed exercise, ID is:", ludo.state.id);

          // exercises.findExerciseIdByName(itemValue).then(data => {
          //   console.log("DATA", data);
          // });
        }}
      >
        {Object.keys(exercisesByCategory.state).length > 0 &&
          exercisesByCategory.state.map(item => {
            return (
              <Picker.Item label={item.name} value={item.name} key={item.id} />
            );
          })}
      </Picker>
      <Button
        title="Add"
        type="solid"
        style={styles.btnAdd}
        onPress={async () => {
          console.log("On save exercise name:", selectedExercisePicker);

          const idVjezbe = await exercises.findExerciseIdByName(
            selectedExercisePicker
          );
          console.log("GLEDAJ OVO: ", idVjezbe);

          await exercises.addWorkoutExercise(
            workoutId,
            idVjezbe,
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
  );
};

const styles = StyleSheet.create({
  btnAdd: {
    width: 200,
    height: 59
  }
});

export default AddExerciseScreen;
