import React, { useContext, useState, useEffect, AsyncStorage } from "react";
import {
  View,
  StyleSheet,
  Text,
  Picker,
  KeyboardAvoidingView
} from "react-native";
import { Context as CustomExercisesContext } from "../../context/CustomExercisesContext";
import { Context as ExerciseCategoriesContext } from "../../context/ExerciseCategoriesContext";
import { Context as ExercisesByCategoryContext } from "../../context/ExercisesByCategoryContext";
import { Context as IdExerciseContext } from "../../context/IdExerciseContext";
import { Input, Button } from "react-native-elements";
import workoutApi from "../../api/workoutApi";
import { NavigationEvents } from "react-navigation";
import Spacer from "../../components/Spacer";

const AddExerciseScreen = ({ navigation }) => {
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
    // <KeyboardAvoidingView enabled behavior="padding">
      <View>
        <View style={{ justifyContent: "center" }}>
          <Spacer>
            <View style={{ alignItems: "center" }}>
              <Picker
                mode="dropdown"
                selectedValue={selectedCategoryPicker}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  width: "80%",
                  height: 45
                }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCategoryPicker(itemValue);
                  console.log(`Selected category: ${itemValue}`);
                  exercisesByCategory.getExercisesByCategory(itemIndex + 1);
                }}
              >
                {Object.keys(exerciseCategories.state).length > 0 &&
                  exerciseCategories.state.map(item => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={item.id}
                      />
                    );
                  })}
              </Picker>
            </View>
          </Spacer>
          <Spacer>
            <View style={{ alignItems: "center" }}>
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
                  console.log(
                    `Selected exxxercise: ${itemValue} -- ${itemIndex}`
                  );
                }}
              >
                {Object.keys(exercisesByCategory.state).length > 0 &&
                  exercisesByCategory.state.map(item => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.name}
                        key={item.id}
                      />
                    );
                  })}
              </Picker>
            </View>
          </Spacer>
        </View>
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
            value={String(weight)}
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
        <View style={styles.btnAddContainer}>
          <View style={{ width: "35%" }}>
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
        </View>
      </View>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  btnAddContainer: {
    marginTop: 25,
    justifyContent: "center",
    flexDirection: "row"
    // marginRight: 25
  }
});

export default AddExerciseScreen;
