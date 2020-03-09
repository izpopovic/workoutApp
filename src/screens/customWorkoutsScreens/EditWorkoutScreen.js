import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import Spacer from "../../components/Spacer";
const EditWorkoutScreen = ({ navigation }) => {
  const { state, updateUserWorkout, getUserWorkouts } = useContext(
    CustomWorkoutContext
  );
  const workout = navigation.getParam("workout");
  const [name, setName] = useState(String(workout.name));
  const [description, setDescription] = useState(String(workout.description));
  const [duration, setDuration] = useState(workout.duration);

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
            label="Name"
            autoCorrect={false}
            value={name}
            onChangeText={newName => {
              setName(newName);
            }}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Description"
            autoCorrect={false}
            multiline={true}
            value={description}
            onChangeText={newDescription => {
              setDescription(newDescription);
            }}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Duration (min)"
            autoCorrect={false}
            value={String(duration)}
            keyboardType="numeric"
            onChangeText={newDuration => {
              setDuration(newDuration);
            }}
          />
        </Spacer>
        <View style={styles.saveBtnContainer}>
          <View style={{ width: "35%" }}>
            <Button
              title="Save"
              onPress={async () => {
                setIsLoading(true);
                await updateUserWorkout(
                  workout.id,
                  name,
                  description,
                  Number(duration)
                );
                await getUserWorkouts();
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
    justifyContent: "space-evenly",
    height: 300
  },
  saveBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default EditWorkoutScreen;
