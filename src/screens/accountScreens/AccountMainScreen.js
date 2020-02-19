import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import { SafeAreaView } from "react-navigation";
const AccountMainScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 32 }}>Account Main Screen</Text>
      <Input label="name" />

      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountMainScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({});

export default AccountMainScreen;
