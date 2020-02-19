import React, { useState, useContext } from "react";
import { Text, Input, Button, Overlay } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Feather } from "react-native-vector-icons";
// import { Context as PlannerContext } from "../../context/PlannerContext";

const AddPlanOverlay = ({ isVisible }) => {
  return (
    <View>
      <Overlay isVisible={isVisible}>
        <Text>Pokazo sam se</Text>
      </Overlay>
      <Button
        title="Add"
        onPress={() => {
          isVisible = false;
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

export default AddPlanOverlay;
