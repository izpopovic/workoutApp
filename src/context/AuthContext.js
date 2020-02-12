import createDataContext from "./createDataContext";
import workoutApi from "../api/workoutApi";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

// this func is going to called by React directly
// whenever we call that dispatch function
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    // in both cases we get a token and we store that token inside of an state object1
    case "signin": {
      return { errorMessage: "", token: action.payload };
    }
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const calculateBMI = (weight, height) => {
  const calculatedBMI = (weight / Math.pow(height, 2)) * 10000;
  console.log(`Calculated BMI is... -> ${calculatedBMI.toFixed(2)}`);
  return calculatedBMI.toFixed(2);
};
// Action Functions
// whenever we create them its a function called with dispatch
// and it returns an fuction is whats gonna be called inside of my component
const signup = dispatch => async ({
  username,
  password,
  name,
  weight,
  height
}) => {
  const BMI = calculateBMI(weight, height);
  console.log(username, password, name, weight, height);

  try {
    const response = await workoutApi.post("api/user/register", {
      username: username,
      password: password,
      name: name,
      dateOfBirth: "2019-10-10T18:25:43.511Z",
      height: Number(height),
      weight: Number(weight),
      BMI: Number(BMI)
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    // we are able to navigate from auth context because of navigationRef.js
    navigate("PredefinedMain");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up..."
    });
  }

  //#region WithPromise
  // .then(function(response) {
  //   console.log(response.data);
  //   console.log(`Status code: ${response.status}`);
  // })
  // .catch(function(error) {
  //   // console.log(error);
  //   // console.log(error.response.data);
  //   // console.log(error.response.headers);
  //   // console.log(error.response.status)
  //   dispatch({ type: "add_error", payload: error.response.data });
  // });
  // };
  //#endregion
};

const signin = dispatch => async ({ username, password }) => {
  try {
    const response = await workoutApi.post("api/user/login", {
      username: username,
      password: password
    });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signin", payload: response.data.token });
    console.log(response.data.token);
    navigate("PredefinedMain");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in..."
    });
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("PredefinedMain");
  } else {
    navigate("logInFlow");
  }
};

const signout = dispatch => {
  //this is a non-compact version of above
  return async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("logInFlow");
  };
};

// actions to modify our state
export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
