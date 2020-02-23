import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { Context as PredefinedWorkoutContext } from "../../context/PredefinedWorkoutContext";

const PredefinedDifficultyScreen = ({ navigation }) => {
  // id of Strength or Cardio (1 or 2)
  const { state, getWorkoutDays } = useContext(PredefinedWorkoutContext);
  const idWorkoutType = navigation.getParam("idWorkoutType");
  return (
    <View style={{ marginTop: 40, alignItems: "center" }}>
      <View style={styles.buttons}>
        <Button
          type="outline"
          title="Begginer"
          onPress={() => {
            // console.log(`PREDEFINED DIOFFICULTY SCREEN WORKOUT DAYS: ${getWorkoutDays(idWorkoutType, 1)}`)
            navigation.navigate("PredefinedDays", {
              idWorkoutType,
              idWorkoutDifficulty: 1
              // numOfWorkoutDays: getWorkoutDays(idWorkoutType, 1)
            });
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="outline"
          title="Intermediate"
          onPress={() =>
            navigation.navigate("PredefinedDays", {
              idWorkoutType,
              idWorkoutDifficulty: 2
            })
          }
        />
      </View>
      <View style={styles.buttons}>
        <Button
          type="outline"
          title="Advanced"
          onPress={() =>
            navigation.navigate("PredefinedDays", {
              idWorkoutType,
              idWorkoutDifficulty: 3
            })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: "70%",
    marginVertical: 50
  }
});

export default PredefinedDifficultyScreen;
