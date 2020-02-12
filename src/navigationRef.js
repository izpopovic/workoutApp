import { NavigationActions } from "react-navigation";

let navigator;

// way of letting components outside react to 
// be able to reach navigation object
export const setNavigator = nav => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};
