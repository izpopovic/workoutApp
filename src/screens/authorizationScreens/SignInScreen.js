import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Spacer from "../../components/Spacer";
import { Input, Button, Text } from "react-native-elements";
import { Context as AuthContext } from "../../context/AuthContext";
import NavLink from "../../components/NavLink";
import { NavigationEvents } from "react-navigation";

const SignInScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Text h2 style={{ paddingLeft: 20, paddingTop: 40, paddingBottom:10 }}>
        Sign In
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
        {state.errorMessage ? (
          <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        ) : null}
      </Spacer>
      <View style={styles.signingBtnContainer}>
        <View style={{ width: "100%" }}>
          <Button
            title="Sign In"
            onPress={() => signin({ username, password })}
          />
        </View>
      </View>
      <View style={{paddingLeft:10}}>
        <NavLink
          routeName="SignUp"
          linkText="Don't have an account? Sign up instead!"
        />
      </View>
    </View>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // view fills up all left vertical space
    justifyContent: "center", // center everything vertically
    marginBottom: 320
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  },
  signingBtnContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginRight: 23.5,
    marginLeft: 23.5
  }
});

export default SignInScreen;
