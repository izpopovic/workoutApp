import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";

const customWorkoutReducer = (state, action) => {
  switch (action.type) {
    case "get_user_workouts":
      return action.payload;
    case "update_user_workout":
      return action.payload;
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
    const response = workoutApi.get(`api/user/${userId}/workouts`);
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
  workoutApi
    .post(`api/user/${userId}/workouts`, {
      name: workoutName,
      description: workoutDescription,
      duration: workoutDuration
    })
    .then(function(response) {
      // handle success
      // console.log(`Get Workout Days response: ${response}`);
      dispatch({
        type: "add_user_workout",
        payload: response.data
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

const updateUserWorkout = dispatch => async (
  id,
  name,
  description,
  duration
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .put(`api/user/${userId}/workouts/${id}`, {
      name: name,
      description: description,
      duration: duration
    })
    .then(function(response) {
      // handle success
      // console.log(`Update User Workout response: ${response}`);
      dispatch({
        type: "update_user_workout",
        payload: response.data
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

// const clearWorkoutDays = dispatch => () => {
//   dispatch({ type: "clear_workout_days" });
// };

export const { Provider, Context } = createDataContext(
  customWorkoutReducer,
  { getUserWorkouts, addUserWorkout, updateUserWorkout },
  {}
);
