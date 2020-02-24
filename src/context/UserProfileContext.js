import React from "react";
import workoutApi from "../api/workoutApi";
import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import JwtDecode from "jwt-decode";

const userProfileReducer = (state, action) => {
  switch (action.type) {
    case "get_user_profile":
      return action.payload;
    case "add_error":
      return { ...state, errorMessage: action.payload };
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

const getUserProfile = dispatch => async () => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    const response = await workoutApi.get(`api/user/${userId}`);
    dispatch({ type: "get_user_profile", payload: response.data });
  } catch (err) {
    console.log("Get user profile errored: ", err);
  }
};

const updateUserProfile = dispatch => async (name, height, weight) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    const response = await workoutApi.put(`api/user/${userId}`, {
      name: name,
      dateofbirth: "2019-10-10T18:25:43.511Z",
      height: Number(height),
      weight: Number(weight),
      BMI: 0
    });
    // dispatch({ type: "update_user_profile", payload: response.data });
  } catch (err) {
    console.log("Update user profile errored:", err);
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  userProfileReducer,
  { clearErrorMessage, getUserProfile, updateUserProfile },
  { errorMessage: "" }
);
