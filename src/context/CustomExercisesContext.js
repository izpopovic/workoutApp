import React, { AsyncStorage } from "react-native";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";
import createDataContext from "./createDataContext";

const customExercisesReducer = (state, action) => {
  switch (action.type) {
      case "get_workout_exercises":
          return action.payload;
    default:
      return state;
  }
};

const getUserIdFromJwt = async () => {
  const token = await AsyncStorage.getItem("token");
  const decodedToken = JwtDecode(token);
  const userIdKey =
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  return { userId: decodedToken[userIdKey] };
};

const getWorkoutExercises = dispatch => async workoutId => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .get(`api/user/${userId}/workouts/${workoutId}/exercises`)
    .then(function(response) {
      console.log(response.data);
      dispatch({ type: "get_workout_exercises", payload: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const { Provider, Context } = createDataContext(
  customExercisesReducer,
  { getWorkoutExercises },
  {}
);
