import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { Context as UserProfileContext } from "../../context/UserProfileContext";
import Spacer from "../../components/Spacer";

const EditUserProfileScreen = ({ navigation }) => {
  const user = navigation.getParam("user");
  const { state, editUserProfile } = useContext(UserProfileContext);
  return (
    <View>
      <Spacer>
        <Input
          style={styles.inputs}
          label="Name"
          // value={state.name}
          // onChangeText={setName}
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          keyboardType="numeric"
          label="Weight  [kg]"
          // value={String(weight)}
          // onChangeText={newWeight => {
          //   setWeight(newWeight);
          // }}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={6}
        />
      </Spacer>

      <Spacer>
        <Input
          keyboardType="numeric"
          label="Height  [cm]"
          // value={String(height)}
          // onChangeText={newHeight => {
          //   setHeight(newHeight);
          // }}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={3}
        />
      </Spacer>

      <Spacer>
        <View style={{ marginTop: 25, borderColor: "yellow", borderWidth: 3 }}>
          <Button
            title="Sign Out"
            onPress={async () => {
              await editUserProfile();
              await getUserProfile();
              navigation.pop();
            }}
          />
        </View>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: 10
  }
});

export default EditUserProfileScreen;
