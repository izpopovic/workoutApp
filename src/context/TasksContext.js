import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";

const plannerReducer = (state, action) => {
  switch (action.type) {
    case "add_user_plan":
      return action.payload;
    case "get_user_planners":
      return action.payload;
    case "group_by_dates":
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

const deletePlan = dispatch => async planId => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;

  try {
    await workoutApi.delete(`api/User/${userId}/planners/${planId}`);
    // dispatch({ type: "add_user_plan", payload: response.data });
  } catch (err) {
    console.log("Delete plan errored: ", err);
  }
};

const addPlan = dispatch => async (date, notes) => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;

  try {
    await workoutApi.post(`api/User/${userId}/planners`, {
      planningDate: date,
      quickNotes: notes
    });
    // dispatch({ type: "add_user_plan", payload: response.data });
  } catch (err) {
    console.log("Add plan errored: ", err);
    return false;
    // ToastAndroid.show(err, ToastAndroid.SHORT);
  }
};

const getPlanners = dispatch => async () => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;

  try {
    const response = await workoutApi.get(`api/User/${userId}/planners`);
    dispatch({ type: "get_user_planners", payload: response.data });
  } catch (err) {
    console.log("Get user planners errored: ", err);
  }
};

// const clearPlanners = dispatch => {
//     dispatch({type:"clear_user_planners", })
// }

export const { Provider, Context } = createDataContext(
  plannerReducer,
  {
    getPlanners,
    addPlan,
    deletePlan
  },
  {}
);
