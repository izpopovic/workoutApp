import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { Context as UserProfileContext } from "../../context/UserProfileContext";
import Spacer from "../../components/Spacer";

const EditUserProfileScreen = ({ navigation }) => {
  const user = navigation.getParam("user");
  const { state, updateUserProfile, getUserProfile } = useContext(
    UserProfileContext
  );


  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [weight, setWeight] = useState(user.weight);
  const [height, setHeight] = useState(user.height);

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
        <View style={styles.mainContainer}>
          <Spacer>
            <Input
              style={styles.inputs}
              label="Name"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
          </Spacer>
          <Spacer>
            <Input
              keyboardType="numeric"
              label="Weight  [kg]"
              value={String(weight)}
              onChangeText={newWeight => {
                setWeight(newWeight);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={6}
            />
          </Spacer>

          <Spacer>
            <Input
              keyboardType="numeric"
              label="Height  [cm]"
              value={String(height)}
              onChangeText={newHeight => {
                setHeight(newHeight);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={3}
            />
          </Spacer>

          <View style={styles.saveBtnContainer}>
            <View style={{ width: "35%" }}>
              <Button
                title="Save"
                onPress={async () => {
                  setIsLoading(true);
                  // isLoading = true;
                  await updateUserProfile(name, height, weight);
                  await getUserProfile();
                  navigation.pop();
                  // isLoading = false;
                }}
              />
            </View>
          </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: 10
  },
  mainContainer: {},
  saveBtnContainer: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5
  }
});

export default EditUserProfileScreen;
