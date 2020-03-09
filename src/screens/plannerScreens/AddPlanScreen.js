import React, { useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "react-native-vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Context as PlannerContext } from "../../context/PlannerContext";

const AddPlanScreen = ({ navigation }) => {
  const { state, addPlan, getPlanners } = useContext(PlannerContext);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const currentDay = navigation.getParam("selectedDay");

  const showDatePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = date => {
    hideDatePicker();
    setTime(date.toTimeString().substring(0, 5));
  };

  return (
    <View style={{ marginTop: 25 }}>
   
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
      <View style={styles.saveBtnContainer}>
        <View style={{ width: "35%" }}>
          <Button
            type="outline"
            title="Add"
            onPress={async () => {
              const planningDate = currentDay + "T" + time + ":00";
              await addPlan(planningDate, notes);
              await getPlanners(parseInt(planningDate.substring(5, 7)));
              navigation.navigate("PlannerMain");
            }}
          />
        </View>
      </View>

      <DateTimePickerModal
        mode="time"
        isVisible={isTimePickerVisible}
        onConfirm={date => {
          handleConfirm(date);
        }}
        onCancel={() => {
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
  },
  saveBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default AddPlanScreen;
