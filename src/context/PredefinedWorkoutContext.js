import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";

const predefinedWorkoutReducer = (state, action) => {
  switch (action.type) {
    //   case "get_userid_from_jwt":
    //       return {userId: action.payload}
    case "get_predefined_exercises":
      return action.payload;
    case "get_workout_days":
      return { numberOfDays: action.payload };
    case "clear_workout_days":
      return { ...state, numberOfDays: 0 };
    default:
      return state;
  }
};

// Action functions

const getUserIdFromJwt = async () => {
  const token = await AsyncStorage.getItem("token");
  const decodedToken = JwtDecode(token);
  const userIdKey =
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  return { userId: decodedToken[userIdKey] };
};

const getPredefinedExercises = dispatch => async (
  workoutTypeId,
  workoutDifficultyId,
  workoutDay
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .get(
      `api/user/${userId}/workouts/predefinedworkouts/workouttype/${workoutTypeId}/workoutDifficulty/${workoutDifficultyId}/day/${workoutDay}`
    )
    .then(function(response) {
      // handle success
      console.log(response.data);
      dispatch({ type: "get_predefined_exercises", payload: response.data });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

const getWorkoutDays = dispatch => async (
  workoutTypeId,
  workoutDifficultyId
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .get(
      `api/user/${userId}/workouts/predefinedworkouts/workouttype/${workoutTypeId}/workoutDifficulty/${workoutDifficultyId}/days`
    )
    .then(function(response) {
      // handle success
      console.log(`Get Workout Days response: ${response.data.numberOfDays}`);
      dispatch({
        type: "get_workout_days",
        payload: response.data.numberOfDays
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

const clearWorkoutDays = dispatch => () => {
  dispatch({ type: "clear_workout_days" });
};

export const { Provider, Context } = createDataContext(
  predefinedWorkoutReducer,
  { getPredefinedExercises, getWorkoutDays, clearWorkoutDays },
  { numberOfDays: 0 }
);
