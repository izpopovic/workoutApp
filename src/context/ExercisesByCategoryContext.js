import React, { AsyncStorage } from "react-native";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";
import createDataContext from "./createDataContext";

const exercisesByCategoryReducer = (state, action) => {
  switch (action.type) {
    case "get_exercise_by_category":
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

const getExercisesByCategory = dispatch => async categoryId => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .get(`api/user/${userId}/exercises/getexercisesbycategory/${categoryId}`)
    .then(function(response) {
      // console.log(response.data);
      dispatch({ type: "get_exercise_by_category", payload: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const { Provider, Context } = createDataContext(
  exercisesByCategoryReducer,
  { getExercisesByCategory },
  {}
);
