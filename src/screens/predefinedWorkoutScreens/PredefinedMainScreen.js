import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Button } from "react-native-elements";

const PredefinedMainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: "flex-start",
          marginTop: 70,
          flexDirection: "row",
          marginBottom: 150,
          marginLeft: 12,
        }}
      >
        <Text h2>WorkoutMe</Text>
      </View>
      <View style={{ width: "70%" }}>
        <Button
          type="outline"
          title="STRENGTH"
          onPress={() =>
            navigation.navigate("PredefinedDifficulty", { idWorkoutType: 1 })
          }
        />
      </View>
      <View style={{ width: "70%", marginTop: 100 }}>
        <Button
          type="outline"
          title="CARDIO"
          onPress={() =>
            navigation.navigate("PredefinedDifficulty", { idWorkoutType: 2 })
          }
        />
      </View>
    </View>
  );
};

PredefinedMainScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  button: {}
});

export default PredefinedMainScreen;
