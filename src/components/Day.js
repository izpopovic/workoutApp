import React, { useState } from "react";
import { Button, View, Text } from "react-native";

const Day = params => {
  const { date, visible } = params;

//   if(visible) console.log(date.toDateString());

  if(visible === false || !date) return <View/>;

  const dateString = date.toDateString();
  const dayOfWeekString = dateString.substring(0, 3);
  const dayString = dateString.substring(8, 10);

  return (
    <View>
      <Text>{dayString}</Text>
      <Text>{dayOfWeekString}</Text>
    </View>
  );
};

export default Day;
