import React, { useState, useContext } from "react";
import { Text, Input, Button } from "react-native-elements";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "react-native-vector-icons";
import { Context as TasksContext } from "../../context/TasksContext";
import Spacer from "../../components/Spacer";

const AddPlanScreen = ({ navigation }) => {
  const { state, addPlan, getPlanners } = useContext(TasksContext);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const showDatePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleConfirm = date => {
    hideDatePicker();

    let fullDate = date.toUTCString().substring(0, 16);
    let timee = date.toTimeString().substring(0, 5);
    setSelectedDay(date.toISOString().substring(0, 10));
    setTime(`${fullDate} -> ${timee}`);
  };

  if (isLoading === true) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flex: 1
        }}
      >
        <ActivityIndicator size="large" color="#e3e3e3" />
      </View>
    );
  } else {
    return (
      <View style={{ marginTop: 25 }}>
        <Spacer>
          <Input label="Notes" onChangeText={setNotes} value={notes} />
        </Spacer>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: "85%" }}>
            <Spacer>
              <Input label="Time" value={time} editable={false} />
            </Spacer>
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
        <View style={styles.addBtnContainer}>
          <View style={{ width: "35%" }}>
            <Button
              type="outline"
              title="Add"
              onPress={async () => {
                setIsLoading(true);
                const planningDate =
                  selectedDay + "T" + time.substring(20, 28) + ":00";

                const response = await addPlan(planningDate, notes);

                if (response === false) {
                  ToastAndroid.show("Time is required!", ToastAndroid.SHORT);
                  setIsLoading(false);
                } else {
                  await getPlanners();
                  navigation.pop();
                }
              }}
            />
          </View>
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
  }
};

const styles = StyleSheet.create({
  icon: {
    fontSize: 28,
    marginLeft: 5,
    marginTop: 15
  },
  addBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default AddPlanScreen;
