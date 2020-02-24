import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";

const PredefinedMainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
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
    marginTop: 180
  },
  button: {}
});

export default PredefinedMainScreen;
