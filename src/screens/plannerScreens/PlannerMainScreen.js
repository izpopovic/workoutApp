import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { AntDesign } from "react-native-vector-icons";
import {
  Text,
  Button,
  ListItem,
  Tooltip,
  Input,
  Overlay
} from "react-native-elements";
import { Context as PlannerContext } from "../../context/PlannerContext";
import { Feather, EvilIcons } from "react-native-vector-icons";
import { navigate } from "../../navigationRef";
import Day from "../../components/Day";
import { NavigationEvents } from "react-navigation";

let selectedDay;
let loaded;
let dayHoveredOver;
let selectedMonth;
let overlayVisibility = false;
const PlannerMainScreen = ({ navigation }) => {
  // const [description, setDescription] = useState("");
  const { state, getPlanners, deletePlan } = useContext(PlannerContext);

  const currentDate = new Date(Date.now());
  if (!selectedDay) selectedDay = currentDate.toISOString().substring(0, 10);
  if (!selectedMonth)
    selectedMonth = parseInt(currentDate.toISOString().substring(5, 7));

  // useEffect(() => {
  //   getPlanners(selectedMonth);
  // }, []);
  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <View
        style={{
          flex: 0.1
          // position: "absolute",
          // left: 0,
          // right: 0,
          // bottom: 0
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 25,
            paddingHorizontal: 20
          }}
        >
          <Text h2>Planner</Text>
          <TouchableOpacity
            onPress={() => {
              navigate("AddPlan", { selectedDay: selectedDay });
              console.log("SELECTED DAY", selectedDay);
            }}
          >
            <Feather name="plus-circle" style={styles.addBtn} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.9 }}>
        <Agenda
          // The list of items that have to be displayed in agenda. If you want to render item as empty date
          // the value of date key has to be an empty array []. If there exists no value for date key it is
          // considered that the date in question is not yet loaded
          items={state.agendaItems}
          // Callback that gets called when items for a certain month should be loaded (month became visible)
          loadItemsForMonth={async date => {
            console.log("Loading items for:", date.dateString);
            console.log("currently loaded:", loaded);
            console.log(
              "Day hovered over:",
              dayHoveredOver && dayHoveredOver.dateString
            );
            const month =
              (dayHoveredOver && dayHoveredOver.month) || date.month;
            // you can only load if the month hovered over is different from the one that was loaded
            if (!dayHoveredOver || dayHoveredOver.month !== loaded) {
              // if (month !== loaded) {
              loaded = month;
              await getPlanners(month);
              console.log("Items loaded for month", month);
              // }
            }
          }}
          // Callback that fires when the calendar is opened or closed
          onCalendarToggled={calendarOpened => {
            console.log(calendarOpened);
          }}
          // Callback that gets called on day press
          onDayPress={async day => {
            console.log("day pressed", day);
            selectedDay = day.dateString;
            dayHoveredOver = day;

            //day.month change it back if not wokring
            const month = (dayHoveredOver && dayHoveredOver.month) || day.month;
            // you can only load if the month hovered over is different from the one that was loaded
            if (!dayHoveredOver || dayHoveredOver.month !== loaded) {
              // if (month !== loaded) {
              loaded = month;
              await getPlanners(month);
              console.log("Items loaded for month", month);
            }
          }}
          // Callback that gets called when day changes while scrolling agenda list
          onDayChange={day => {
            // console.log(day);
            dayHoveredOver = day;
            selectedDay = day.dateString;
            // console.log("day changed", day);
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
            // if (item.key !== selectedDay) return <View />;
            return (
              <ListItem
                style={{ padding: 15, backgroundColor: "white", margin: 10 }}
                key={item.id}
                title={item.time}
                subtitle={`${item.note}`}
                bottomDivider
                onPress={async () => {
                  // console.log(`${item.time} - ${item.key}`);
                  console.log("ITEM ID:", item.id);
                }}
                rightIcon={() => {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        await deletePlan(item.id);

                        const month =
                          (dayHoveredOver && dayHoveredOver.month) ||
                          selectedMonth;
                        // you can only load if the month hovered over is different from the one that was loaded
                        if (
                          !dayHoveredOver ||
                          dayHoveredOver.month !== loaded
                        ) {
                          // if (month !== loaded) {
                          loaded = month;
                          console.log("\n");
                          console.log("CurrentMonth: ", selectedMonth);
                          console.log("\n");
                        }
                        await getPlanners(month);
                        // navigation.navigate("PlannerMain");
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
          // renderDay={(day, item) => {
          // return (
          //   <Text>
          //     {item.key} - {item.note}
          //   </Text>
          // );

          // console.log(' day', day, item);
          // return (
          //   <View>
          //     <Day date={new Date(item.key)} visible={!!day} />
          //     <View>
          //       <Text>
          //         {item.time} ({item.note})
          //       </Text>
          //     </View>
          //   </View>
          // );
          // return (
          //   <View style={styles.emptyDate}>
          //     <Text>This is RENDER DAY!</Text>
          //   </View>
          // );
          // }}
          // Specify how empty date content with no items should be rendered
          // renderEmptyDate={() => {
          //   console.log("EMPTY DATE");
          //   // return (
          //   //   <View style={styles.emptyDate}>
          //   //     <Text>This is empty date!</Text>
          //   //   </View>
          //   // );
          //   return <View><Text>Ovo nama je bitno</Text></View>;
          // }}
          // Specify how agenda knob should look like
          renderKnob={() => {
            return <AntDesign name="down" style={{ paddingTop: 10 }} />;
          }}
          // Specify what should be rendered instead of ActivityIndicator
          // renderEmptyData={() => {
          //   // console.log("EMPTY DATa");
          //   return (
          //     <View style={{alignSelf: 'center', paddingTop: 100}}>
          //       <Text>:(</Text>
          //     </View>
          //   );
          // }}
          // Specify your item comparison function for increased performance
          rowHasChanged={(r1, r2) => false}
          // Hide knob button. Default = false
          hideKnob={false}
          // By default, agenda dates are marked if they have at least one item, but you can override this if needed
          markedDates={state.markedDates}
          // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
          // disabledByDefault={true}
          // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
          // onRefresh={() => {
          //   console.log("refreshing...");
          //   // getPlanners();
          // }}
          // // Set this true while waiting for new data from a refresh
          // refreshing={false}
          // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
          // refreshControl={null}
          // Agenda theme
          // theme={
          //   {
          //     // agendaDayTextColor: "yellow",
          //     // agendaDayNumColor: "green",
          //     // agendaTodayColor: "red",
          //     // agendaKnobColor: "blue"
          //   }
          // }
          // Agenda container style
          // style={{}}
        />
      </View>
    </View>
    // <View>

    //   <AddPlanOverlay isVisible={overlayVisibility} />
    // </View>
  );
};

// PlannerMainScreen.navigationOptions = () => {
//   return {
//     // headerRight: (
//     //   <TouchableOpacity
//     //     onPress={() => {
//     //       navigate("AddPlan", { selectedDay });
//     //     }}
//     //   >
//     //     <Feather name="plus-circle" style={styles.addBtn} />
//     //   </TouchableOpacity>
//     //   // <View>
//     //   //   <TouchableOpacity onPress={() => (overlayVisibility = true)}>
//     //   //     <Feather name="plus-circle" style={styles.addBtn} />
//     //   //   </TouchableOpacity>
//     //   // </View>
//     // ),
//     // title: "Planner"
//   };
// };

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  addBtn: {
    fontSize: 32,
    marginRight: 10,
    justifyContent: "flex-end"
  }
});

export default PlannerMainScreen;
// "stylesheet.calendar.header": {
//     week: {
//       marginTop: Platform.OS == "ios" ? 6 : 2,
//       flexDirection: "row",
//       justifyContent: "space-between"
//       // marginVertical:5
//     }
//   }
