import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";

const customWorkoutReducer = (state, action) => {
  switch (action.type) {
    // case "add_error":
    //   return { errorMessage: action.payload };
    // case "clear_error_message":
    //   return { errorMessage: "" };
    case "get_user_workouts":
      return action.payload;
    case "update_user_workout":
      return action.payload;
    case "delete_user_workout":
      return action.payload;
    default:
      return state;
  }
};

// Action functions

// const clearErrorMessage = dispatch => () => {
//   dispatch({ type: "clear_error_message" });
// };

const getUserIdFromJwt = async () => {
  const token = await AsyncStorage.getItem("token");
  const decodedToken = JwtDecode(token);
  const userIdKey =
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  return { userId: decodedToken[userIdKey] };
};

const getUserWorkouts = dispatch => async () => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  // workoutApi
  //   .get(`api/user/${userId}/workouts`)
  //   .then(function(response) {
  //     // handle success
  //     // console.log(response.data);
  //     dispatch({ type: "get_user_workouts", payload: response.data });
  //   })
  //   .catch(function(error) {
  //     // handle error
  //     console.log(error);
  //   });
  try {
    const response = await workoutApi.get(`api/user/${userId}/workouts`);
    dispatch({ type: "get_user_workouts", payload: response.data });
  } catch (err) {
    console.log("Get user workouts errored: ", err);
  }
};

const addUserWorkout = dispatch => async (
  workoutName,
  workoutDescription,
  workoutDuration
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    const response = await workoutApi.post(`api/user/${userId}/workouts`, {
      name: workoutName,
      description: workoutDescription,
      duration: workoutDuration
    });
    dispatch({
      type: "add_user_workout",
      payload: response.data
    });
  } catch (err) {
    console.log("Add user workout errored:", err);
    return false;
  }
};

const updateUserWorkout = dispatch => async (
  id,
  name,
  description,
  duration
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    const response = await workoutApi.put(`api/user/${userId}/workouts/${id}`, {
      name: name,
      description: description,
      duration: duration
    });
    dispatch({
      type: "update_user_workout",
      payload: response.data
    });
  } catch (err) {
    console.log("Update user workout errored:", err);
    return false;
  }
};

const deleteUserWorkout = dispatch => async workoutId => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    await workoutApi.delete(`api/user/${userId}/workouts/${workoutId}`);
    // dispatch({ type: "delete_user_workout", payload: response.data });
  } catch (err) {
    console.log("Delete user workout errored:", err);
  }
};

// const clearWorkoutDays = dispatch => () => {
//   dispatch({ type: "clear_workout_days" });
// };

export const { Provider, Context } = createDataContext(
  customWorkoutReducer,
  {
    getUserWorkouts,
    addUserWorkout,
    updateUserWorkout,
    deleteUserWorkout
  },
  { errorMessage: "" }
);
