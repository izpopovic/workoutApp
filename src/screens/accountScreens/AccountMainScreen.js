import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Button, Input, Text, Divider } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as UserProfileContext } from "../../context/UserProfileContext";
import { SafeAreaView } from "react-navigation";
import Spacer from "../../components/Spacer";
import { Feather } from "react-native-vector-icons";

let isLoading = true;
const AccountMainScreen = ({ navigation }) => {
  const { signout } = useContext(AuthContext);
  const { state, getUserProfile, updateUserProfile } = useContext(
    UserProfileContext
  );

  // const [isLoading, setIsLoading] = useState(true);
  // const [editableInputs, setEditableInputs] = useState(false);
  // const [focused, setFocused] = useState(false);
  // const [btnTitle, setBtnTitle] = useState("Sign out");

  useEffect(() => {
    getUserProfile();
    isLoading = false;
  }, []);
  // setIsLoading(false)
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
      <SafeAreaView forceInset={{ top: "always" }} style={{}}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text h2 style={{ margin: 20, flex: 0.8 }}>
            Profile
          </Text>
          <View style={{ flexDirection: "row", flex: 0.2 }}>
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                navigation.navigate("EditUserProfile", { user: state });
              }}
            >
              <Feather name="edit" style={{ fontSize: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Divider style={{ backgroundColor: "grey", height:20 }} /> */}

        <Spacer>
          <Input
            style={styles.inputs}
            label="Name"
            editable={false}
            value={state.name}
            autoCorrect={false}
          />
        </Spacer>
        <Spacer>
          <Input
            keyboardType="numeric"
            label="Weight  [kg]"
            editable={false}
            value={String(state.weight)}
            onChangeText={newWeight => {
              setWeight(newWeight);
            }}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>

        <Spacer>
          <Input
            keyboardType="numeric"
            label="Height  [cm]"
            editable={false}
            value={String(state.height)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>

        <View
          style={{
            marginTop: 25,
            justifyContent: "flex-end",
            flexDirection: "row",
            marginRight: 23.5
          }}
        >
          <View style={{ width: "35%" }}>
            <Button title="Sign Out" onPress={signout} style={{}} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
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
