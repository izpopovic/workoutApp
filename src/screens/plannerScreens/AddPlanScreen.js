import React, { useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "react-native-vector-icons";
import { TextInput } from "react-native-gesture-handler";
import Example from "../../components/Example";
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
              console.log("WTF");
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
            const planningDate = currentDay + "T" + time + ":00";
            // console.log(planningDate);
            await addPlan(planningDate, notes);
            await getPlanners(parseInt(planningDate.substring(5, 7))); // daj ti mali pozovi ovo ak ces samo overlay imat (isto ko delete koji je na istom prozoru wooooooooooow)
            navigation.navigate("PlannerMain");
          }}
        />
      </View>

      <DateTimePickerModal
        mode="time"
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
