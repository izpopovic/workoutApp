import React, { AsyncStorage } from "react-native";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";
import createDataContext from "./createDataContext";

const idExerciseReducer = (state, action) => {
  switch (action.type) {
    case "find_workout_id_by_name":
      console.log("Pejlojd:", action.payload);
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

const findExerciseIdByName = dispatch => async name => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .get(`api/user/${userId}/exercises/findexercisebyname/${name}`)
    .then(function(response) {
      // console.log(response.data);
      dispatch({ type: "find_workout_id_by_name", payload: response.data });
      console.log("Response from findexeridbyname: ", response.data.id);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const { Provider, Context } = createDataContext(
  idExerciseReducer,
  {
    findExerciseIdByName
  },
  {}
);
