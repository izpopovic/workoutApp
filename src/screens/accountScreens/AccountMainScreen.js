import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserProfileContext } from "../../context/UserProfileContext";
import { SafeAreaView } from "react-navigation";
import Spacer from "../../components/Spacer";
import { Feather } from "react-native-vector-icons";
const AccountMainScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const { state, getUserProfile, updateUserProfile } = useContext(
    UserProfileContext
  );
  const [editableInputs, setEditableInputs] = useState(false);
  const [focused, setFocused] = useState(false);
  const [btnTitle, setBtnTitle] = useState("Sign out");

  const [name, setName] = useState(state.name);
  const [weight, setWeight] = useState(state.weight);
  const [height, setHeight] = useState(state.height);

  useEffect(() => {
    getUserProfile();
  }, []);
  console.log(state.weight);
  console.log(state.height);
  return (
    <SafeAreaView
      forceInset={{ top: "always" }}
      style={{ borderColor: "black", borderWidth: 3 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text h2 style={{ margin: 20, flex: 0.8 }}>
          Profile
        </Text>
        <View style={{ flexDirection: "row", flex: 0.2 }}>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              // navigation.navigate("EditUserProfile");

              setEditableInputs(true);
              // setFocused(true);
              setBtnTitle("Save");
            }}
          >
            <Feather name="edit" style={{ fontSize: 40 }} />
          </TouchableOpacity>
        </View>
      </View>

      <Spacer>
        <Input
          autoFocus={focused}
          style={styles.inputs}
          label="Name"
          editable={editableInputs}
          value={state.name}
          onChangeText={newName => {
            setName(newName);
          }}
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          keyboardType="numeric"
          label="Weight  [kg]"
          editable={editableInputs}
          value={String(state.weight)}
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
          editable={editableInputs}
          value={String(state.height)}
          onChangeText={newHeight => {
            setHeight(newHeight);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={3}
        />
      </Spacer>

      <Spacer>
        <View style={{ marginTop: 25, borderColor: "yellow", borderWidth: 3 }}>
          <Button
            title={btnTitle}
            onPress={async () => {
              if (btnTitle === "Sign Out") {
                signout();
              } else {
                await updateUserProfile(name, height, weight);
                await getUserProfile();
                setBtnTitle("Sign Out");
              }
            }}
          />
        </View>
      </Spacer>
    </SafeAreaView>
  );
};
// STAVI IF STATE UNDEFINED I ONO DA SE VRTI JEDNOSTAVNO
AccountMainScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  inputs: {
    marginTop: 10
  }
});

export default AccountMainScreen;
