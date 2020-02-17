import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
import JwtDecode from "jwt-decode";
import workoutApi from "../api/workoutApi";

const plannerReducer = (state, action) => {
  switch (action.type) {
    case "get_user_planners":
      return action.payload;
    case "sjebi_payload":
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

const getPlanners = dispatch => async () => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;

  try {
    const response = await workoutApi.get(`api/User/${userId}/planners`);
    // dispatch({ type: "get_user_planners", payload: response.data });
    sjebiState(dispatch, response.data);
  } catch (err) {
    console.log("Get user planners errored: ", err);
  }
};

const sjebiState = (dispatch, items) => {
  const result = {};
  items &&
    items.constructor === Array &&
    items.forEach(item => {
      const date = item.planningDate.substring(0, 10);

      //if doesnt contain key...
      if (!result[date]) result[date] = [];
      // push into array
      result[date].push({
        id: item.id,
        time: item.planningDate.substring(11, 19),
        note: item.quickNotes,
        key: date
      });
    });

//   console.log("Extracted planners...");
//   console.log(result);

  //   return result;
  dispatch({ type: "sjebi_payload", payload: result });
  console.log("getPlanners returned: ", result);
};

// const clearPlanners = dispatch => {
//     dispatch({type:"clear_user_planners", })
// }

export const { Provider, Context } = createDataContext(
  plannerReducer,
  {
    getPlanners
  },
  {}
);
