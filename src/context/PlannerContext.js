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
  }
};

const getPlanners = dispatch => async month => {
  const obj = getUserIdFromJwt();
  const userId = (await obj).userId;

  try {
    const response = await workoutApi.get(`api/User/${userId}/planners`);
    // dispatch({ type: "get_user_planners", payload: response.data });
    groupByDates(dispatch, response.data, month);
  } catch (err) {
    console.log("Get user planners errored: ", err);
  }
};

const groupByDates = (dispatch, items, month) => {
  const markedDates = {};
  const agendaItems = {};
  const year = new Date(Date.now()).getFullYear();

  if (items && items.constructor === Array) {
    const numDays = new Date(year, month, 0).getDate();
    const itemsDic = {};

    items.forEach(item => {
      const date = item.planningDate.substring(0, 10);
      const monthString = date.substring(5, 7);
      const currentMonth = parseInt(monthString);

      // If this item is in the current month that needs to be loaded...
      if (!isNaN(currentMonth) && currentMonth === month) {
        const dayString = date.substring(8, 10);
        const currentDay = parseInt(dayString);

        if (!isNaN(currentDay)) {
          // Make sure we have collection of items for current day
          if (!itemsDic[currentDay])
            itemsDic[currentDay] = {
              items: [],
              date: date
            };

          // Add to the collection of items for current day
          itemsDic[currentDay].items.push(item);
        }
      }

      // Mark the date on calendar with dot
      if (!markedDates[date]) markedDates[date] = { marked: true };
    });

    for (let i = 1; i <= numDays; i++) {
      const itemsForCurrentDay = itemsDic[i];

      // If there are some items on current day...
      if (itemsForCurrentDay) {
        // Create an array for that day
        agendaItems[itemsForCurrentDay.date] = [];

        // Insert all of the items that are scheduled for that day
        itemsForCurrentDay.items.forEach(item =>
          agendaItems[itemsForCurrentDay.date].push({
            id: item.id,
            time: item.planningDate.substring(11, 19),
            note: item.quickNotes,
            key: itemsForCurrentDay.date
          })
        );

        // Otherwise...
      } else {
        const date = new Date(year, month - 1, i + 1).toISOString().substring(0, 10);
        agendaItems[date] = [];
      }
    }
  }

  dispatch({ type: "group_by_dates", payload: { agendaItems, markedDates } });
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
