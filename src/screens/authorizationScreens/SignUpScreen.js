import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import NavLink from "../../components/NavLink";
import { NavigationEvents } from "react-navigation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      scrollEnabled={true}
      resetScrollToCoords={{ x: 0, y: 0 }}
    >
      <View style={styles.container}>
        <NavigationEvents onWillBlur={clearErrorMessage} />
        <Text h2 style={{ paddingLeft: 20, paddingTop: 30, paddingBottom: 10 }}>
          Sign Up
        </Text>
        <Spacer>
          <Input
            label="Username"
            value={username}
            onChangeText={newUsername => setUsername(newUsername)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>
        <Spacer>
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>
        <Spacer>
          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
        </Spacer>
        <Spacer>
          <Input
            keyboardType="decimal-pad"
            label="Weight [kg]"
            value={weight === 0 ? "" : weight}
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
            label="Height [cm]"
            value={height === 0 ? "" : height}
            onChangeText={newHeight => {
              setHeight(newHeight);
            }}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={3}
          />
        </Spacer>
        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}
        <View style={styles.signupBtnContainer}>
          <View style={{ width: "100%" }}>
            <Button
              title="Sign Up"
              onPress={() =>
                signup({ username, password, name, weight, height })
              }
            />
          </View>
        </View>
        <View style={{paddingLeft:10}}>
          <NavLink
            routeName="SignIn"
            linkText="Already have an account? Sign in instead!"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

SignUpScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // view fills up all left vertical space
    justifyContent: "center", // center everything vertically
    marginBottom: 25,
    marginTop: 35
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  },
  signupBtnContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5,
    marginLeft: 23.5,
    paddingTop: 15
  }
});

export default SignUpScreen;
