import React, { useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "react-native-vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Example from "../../components/Example";
import { Context as TasksContext } from "../../context/TasksContext";

const AddPlanScreen = ({ navigation }) => {
  const { state, addPlan, getPlanners } = useContext(TasksContext);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  // const currentDay = navigation.getParam("selectedDay");
  // console.log("Add plan screen recieved:", currentDay);

  const showDatePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = date => {
    hideDatePicker();
    // let initialDate = date;
    // let year = date.getFullYear();
    // let month = date.getMonth();
    // let day = date.getDay();

    let fullDate = date.toUTCString().substring(0, 16);
    let timee = date.toTimeString().substring(0, 5);
    setSelectedDay(date.toISOString().substring(0,10));
    setTime(`${fullDate} -> ${timee}`);
    console.log(time.substring(20,28));
    // console.log("Selected day:", date.toISOString().substring(0,10));
    // setTime(date.toISOString()); // format in which we should send the time to be saved!
    // console.log(
    //   `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${time}`
    // );
    console.log("Recieved date", date);
  };

  return (
    <View style={{ marginTop: 45 }}>
      <Text h2 style={{ padding: 8 }}>
        Add plan
      </Text>
      <Input label="Notes" onChangeText={setNotes} value={notes} />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: "85%" }}>
          <Input label="Time" value={time} editable={false} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
          >
            <Feather name="clock" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 20 }}>
        <Button
          type="outline"
          title="Add"
          onPress={async () => {
            const planningDate = selectedDay + "T" + time.substring(20,28) + ":00";
            // console.log(planningDate);
            await addPlan(planningDate, notes);
            await getPlanners();
            navigation.pop();
          }}
        />
      </View>

      <DateTimePickerModal
        mode="datetime"
        isVisible={isTimePickerVisible}
        onConfirm={date => {
          handleConfirm(date);
        }}
        onCancel={() => {
          console.log("On Šanel");
          hideDatePicker();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    marginLeft: 5,
    marginTop: 15
  }
});

export default AddPlanScreen;
