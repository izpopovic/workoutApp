import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { Text, Button, ListItem, Tooltip } from "react-native-elements";
import { Feather, EvilIcons } from "react-native-vector-icons";
import { Context as TasksContext } from "../../context/TasksContext";

const TaskMainScreen = ({ navigation }) => {
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    tasksContext.getPlanners();
    // isLoading = false;
  }, []);

  const getPrettyTimeFormat = planningDate => {
    let dateInISO = planningDate;
    let newDateUTC = new Date(dateInISO + "Z");
    let wantedFormat = newDateUTC.toUTCString();
    return `${wantedFormat.substring(17, 22).toString()}`;
  };

  const getPrettyDateFormat = planningDate => {
    let dateInISO = planningDate;
    let newDateUTC = new Date(dateInISO + "Z");
    let wantedFormat = newDateUTC.toUTCString();
    return `${wantedFormat.substring(0, 16)}`;
  };

  const renderItem = item => (
    <ListItem
      rightSubtitle={getPrettyTimeFormat(item.planningDate)}
      title={getPrettyDateFormat(item.planningDate)}
      subtitle={`${item.quickNotes}`}
      bottomDivider
      onPress={() => {
        // await tasksContext.getPlanners();
        // navigation.navigate("WorkoutExercises", { workout: item });
      }}
      rightIcon={() => {
        return (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                //if he clicks 100 times fast then the toast android will stay on screen
                //and api will make the calls 100 times...
                //maybe better to raise an Alert and ask for confirmation to delete
                ToastAndroid.show("Keep up the good work!", ToastAndroid.SHORT);
                await tasksContext.deletePlan(item.id);
                await tasksContext.getPlanners();
              }}
            >
              <Feather name="check" style={{ fontSize: 37, color: "green" }} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );

  return (
    <View>
      {/* <NavigationEvents onDidFocus={getUserWorkouts} /> */}
      <View style={styles.titleContainer}>
        <Text h2 style={styles.workoutName}>
          Tasks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("TaskAdd")}>
          <Feather name="plus-circle" style={styles.addTaskIcon} />
        </TouchableOpacity>
      </View>
      <>
        <FlatList
          on
          contentContainerStyle={styles.flatListContainer}
          data={Object.values(tasksContext.state)}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({ item }) => renderItem(item)}
        />
      </>
    </View>
  );
};

TaskMainScreen.navigationOptions = () => {
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
  addTaskIcon: {
    fontSize: 35,
    alignSelf: "center",
    marginRight: 10,
    marginVertical: 10
  },
  flatListContainer: {
    paddingBottom: 135
  }
});

export default TaskMainScreen;
