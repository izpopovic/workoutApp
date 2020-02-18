import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { AntDesign } from "react-native-vector-icons";
import { Text, Button, ListItem, Tooltip, Input } from "react-native-elements";
import { Context as PlannerContext } from "../../context/PlannerContext";
import { Feather, EvilIcons } from "react-native-vector-icons";
import { navigate } from "../../navigationRef";

let selectedDay;

const PlannerMainScreen = ({ navigation }) => {
  // const [description, setDescription] = useState("");
  const { state, getPlanners, deletePlan } = useContext(PlannerContext);

  useEffect(() => {
    getPlanners();
  }, []);
  console.log(state);

  const currentDate = new Date(Date.now());
  selectedDay = currentDate.toISOString().substring(0, 10);

  return (
    <Agenda
      // The list of items that have to be displayed in agenda. If you want to render item as empty date
      // the value of date key has to be an empty array []. If there exists no value for date key it is
      // considered that the date in question is not yet loaded
      items={state.agendaItems}
      // Callback that gets called when items for a certain month should be loaded (month became visible)
      loadItemsForMonth={month => {
        console.log("trigger items loading");
      }}
      // Callback that fires when the calendar is opened or closed
      onCalendarToggled={calendarOpened => {
        console.log(calendarOpened);
      }}
      // Callback that gets called on day press
      onDayPress={day => {
        console.log("day pressed", day);
        selectedDay = day.dateString;
      }}
      // Callback that gets called when day changes while scrolling agenda list
      onDayChange={day => {
        console.log("day changed", day);
      }}
      // Initially selected day
      selected={selectedDay}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2016-02-17"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2024-02-17"}
      // Max amount of months allowed to scroll to the past. Default = 50
      pastScrollRange={50}
      // Max amount of months allowed to scroll to the future. Default = 50
      futureScrollRange={50}
      // Specify how each item should be rendered in agenda
      renderItem={(item, firstItemInDay) => {
        if (item.key !== selectedDay) return <View />;

        return (
          <ListItem
            key={item.id}
            title={item.time}
            subtitle={`${item.note}`}
            bottomDivider
            onPress={async () => {
              console.log(`${item.time} - ${item.note}`);
            }}
            rightIcon={() => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    await deletePlan(item.id);
                    await getPlanners();
                  }}
                >
                  <EvilIcons
                    name="trash"
                    style={{ fontSize: 35, color: "red" }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        );
      }}
      // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
      renderDay={(day, item) => {
        return <View />;
      }}
      // Specify how empty date content with no items should be rendered
      renderEmptyDate={() => {
        return <View />;
      }}
      // Specify how agenda knob should look like
      renderKnob={() => {
        return <AntDesign name="down" />;
      }}
      // Specify what should be rendered instead of ActivityIndicator
      renderEmptyData={() => {
        return <View />;
      }}
      // Specify your item comparison function for increased performance
      rowHasChanged={(r1, r2) => true}
      // Hide knob button. Default = false
      hideKnob={false}
      // By default, agenda dates are marked if they have at least one item, but you can override this if needed
      markedDates={state.markedDates}
      // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
      disabledByDefault={true}
      // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
      onRefresh={() => console.log("refreshing...")}
      // Set this true while waiting for new data from a refresh
      refreshing={false}
      // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
      refreshControl={null}
      // Agenda theme
      theme={{
        agendaDayTextColor: "yellow",
        agendaDayNumColor: "green",
        agendaTodayColor: "red",
        agendaKnobColor: "blue"
      }}
      // Agenda container style
      style={{}}
    ></Agenda>
  );
};

PlannerMainScreen.navigationOptions = () => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigate("AddPlan", { selectedDay })}>
        <Feather name="plus-circle" style={styles.addBtn} />
      </TouchableOpacity>
    ),
    title: "Planner"
  };
};

const styles = StyleSheet.create({
  addBtn: {
    fontSize: 32,
    alignSelf: "center",
    marginRight: 10,
    marginVertical: 10
  }
});

export default PlannerMainScreen;
