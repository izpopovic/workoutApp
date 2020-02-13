import React, { useContext, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Feather } from "react-native-vector-icons";
import { AntDesign } from "react-native-vector-icons";
// import Context from "../../context/CustomWorkoutContext";
import { Context as CustomWorkoutContext } from "../../context/CustomWorkoutContext";
import { NavigationEvents } from "react-navigation";

const WorkoutsMainScreen = ({ navigation }) => {
  const { state, getUserWorkouts } = useContext(CustomWorkoutContext);

  const renderItem = item => (
    <ListItem
      title={item.name}
      subtitle={`${item.description}`}
      bottomDivider
      onPress={() => {
        console.log(item.name);
        navigation.navigate("WorkoutExercises", { workout: item });
      }}
      rightIcon={() => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditWorkout", { workout: item });
            }}
          >
            <Feather name="edit" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        );
      }}
    />
  );

  // state is an array...
  // console.log(state[0])
  // // if (state[0] === undefined) {
  // //   return (
  // //     <View
  // //       style={{
  // //         flex: 1,
  // //         alignItems: "center",
  // //         justifyContent: "center",
  // //         marginBottom: 200
  // //       }}
  // //     >
  // //       <Text h1 style={{ color: "red" }}>
  // //         Loading...
  // //       </Text>
  // //       <NavigationEvents onDidFocus={getUserWorkouts} />

  // //       <NavigationEvents onWillFocus={getUserWorkouts} />
  // //     </View>
  // //   );
  // } else {
  return (
    <View>
      <NavigationEvents onDidFocus={getUserWorkouts} />
      <View style={styles.titleContainer}>
        <Text h2 style={styles.workoutName}>
          Workouts
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
          <Feather name="plus-circle" style={styles.addWorkoutIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={state}
        keyExtractor={(item, index) => String(item.id)}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};
// };

WorkoutsMainScreen.navigationOptions = () => {
  return {
    header: null
  };
};
const styles = StyleSheet.create({
  headerIcon: {
    fontSize: 33,
    marginRight: 20
  },
  titleContainer: {
    marginTop: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 12
  },
  addWorkoutIcon: {
    fontSize: 32,
    alignSelf: "center",
    marginRight: 10,
    marginVertical: 10
  }
});

export default WorkoutsMainScreen;
