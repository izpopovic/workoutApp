import React, { AsyncStorage } from "react-native";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";
import createDataContext from "./createDataContext";

const customExercisesReducer = (state, action) => {
  switch (action.type) {
    case "add_workout_exercise":
      return action.payload;
    case "get_workout_exercises":
      return action.payload;
    case "find_workout_id_by_name":
      console.log("Pejlojd:", action.payload);
      return action.payload;
    case "reset":
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
  // workoutApi
  //   .get(`api/user/${userId}/workouts/${workoutId}/exercises`)
  //   .then(function(response) {
  //     // console.log(response.data);
  //     dispatch({ type: "get_workout_exercises", payload: response.data });
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
  try {
    const response = await workoutApi.get(
      `api/user/${userId}/workouts/${workoutId}/exercises`
    );
    dispatch({ type: "get_workout_exercises", payload: response.data });
  } catch (err) {
    console.log("Get workout exercises error: ", err);
  }
};

const updateWorkoutExercise = dispatch => async (
  workoutId,
  exerciseId,
  reps,
  sets,
  weight,
  description
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  workoutApi
    .put(`api/user/${userId}/workouts/${workoutId}/exercises/${exerciseId}`, {
      reps: reps,
      sets: sets,
      weight: Number(weight),
      description: description
    })
    .then(function(response) {
      console.log("Update workout exercise:", response.data);
      console.log(
        `Update exercise data: ${sets} ${reps} ${weight} ${description}`
      );
      dispatch({ type: "update_workout_exercises", payload: response.data });
    })
    .catch(function(error) {
      console.log(
        `Update exercise data error: ${sets} ${reps} ${weight} ${description}`
      );
      console.log(error);
      //show errror
      //look at how dude did it with error message cleanup and shit
    });
};

const findExerciseIdByName = dispatch => async name => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  try {
    const response = await workoutApi.get(
      `api/user/${userId}/exercises/findexercisebyname/${name}`
    );
    console.log("Response from findIdByName: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Find exercise id by name errored: ", error);
  }
};

const addWorkoutExercise = dispatch => async (
  workoutId,
  exerciseId,
  reps,
  sets,
  weight,
  description
) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;
  console.log("Workout and exercise id:", workoutId, exerciseId);
  workoutApi
    .post(`api/user/${userId}/workouts/${workoutId}/exercises/${exerciseId}`, {
      reps: reps,
      sets: sets,
      weight: Number(weight),
      description: description
    })
    .then(function(response) {
      // console.log(response.data);
      dispatch({ type: "add_workout_exercise", payload: response.data });
    })
    .catch(function(error) {
      console.log(error);
    });
};

const resetExercises = dispatch => () => {
  dispatch({ type: "reset", payload: undefined });
};

export const { Provider, Context } = createDataContext(
  customExercisesReducer,
  {
    getWorkoutExercises,
    resetExercises,
    updateWorkoutExercise,
    addWorkoutExercise,
    findExerciseIdByName
  },
  {}
);
