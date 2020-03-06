import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
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

  const renderItem = item => (
    <ListItem
      rightSubtitle={`Test`}
      title={item.planningDate}
      subtitle={`${item.quickNotes}`}
      bottomDivider
      onPress={async () => {
        // await tasksContext.getPlanners();
        // navigation.navigate("WorkoutExercises", { workout: item });
      }}
      rightIcon={() => {
        return (
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("TaskEdit", { task: item });
              }}
            >
              <Feather name="edit" style={{ fontSize: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                await tasksContext.deletePlan(item.id);
                await tasksContext.getPlanners();
              }}
            >
              <EvilIcons name="trash" style={{ fontSize: 37, color: "red" }} />
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
    fontSize: 32,
    alignSelf: "center",
    marginRight: 10,
    marginVertical: 10
  },
  flatListContainer: {
    paddingBottom: 135
  }
});

export default TaskMainScreen;
