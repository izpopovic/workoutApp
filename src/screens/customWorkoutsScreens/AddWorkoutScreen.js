import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import { Input, Button } from "react-native-elements";
import Spacer from "../../components/Spacer";

const AddWorkoutScreen = ({ navigation }) => {
  const { state, addUserWorkout, getUserWorkouts } = useContext(
    CustomWorkoutContext
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

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
            multiline={true}
            style={{ margin: 15 }}
            autoCorrect={false}
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
              title="Add"
              style={{}}
              onPress={() => {
                setIsLoading(true);
                addUserWorkout(name, description, Number(duration));
                getUserWorkouts();
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
    // flex:1,
    justifyContent: "space-evenly"
  },
  saveBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
    // width: 100,
  }
});

export default AddWorkoutScreen;
