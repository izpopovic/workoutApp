import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import NavLink from "../../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignUpScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(
    AuthContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  // const [BMI, setBMI] = useState(0);
  const regex = RegExp(/[0-9][0-9][0-9]/g);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Spacer>
        <Text h3>Sign Up</Text>
      </Spacer>
      <Input
        label="Username"
        value={username}
        onChangeText={newUsername => setUsername(newUsername)}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        autoCorrect={false}
      />
      <Spacer />
      <Input
        keyboardType="numeric"
        label="Weight (kg)"
        value={String(weight)}
        onChangeText={newWeight => {
          setWeight(newWeight);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={6}
      />
      <Spacer />
      <Input
        keyboardType="numeric"
        label="Height (cm)"
        value={String(height)}
        onChangeText={newHeight => {
          setHeight(newHeight);
        }}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={3}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title="Sign Up"
          onPress={() => signup({ username, password, name, weight, height })}
        />
      </Spacer>
      <NavLink
        routeName="SignIn"
        linkText="Already have an account? Sign in instead!"
      />
    </View>
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
    marginBottom: 25
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  }
});

export default SignUpScreen;
