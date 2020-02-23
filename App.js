import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignUpScreen from "./src/screens/authorizationScreens/SignUpScreen";
import SignInScreen from "./src/screens/authorizationScreens/SignInScreen";
import PredefinedMainScreen from "./src/screens/predefinedWorkoutScreens/PredefinedMainScreen";
import PredefinedDifficultyScreen from "./src/screens/predefinedWorkoutScreens/PredefinedDifficultyScreen";
import PredefinedExercisesScreen from "./src/screens/predefinedWorkoutScreens/PredefinedExercisesScreen";
import PredefinedExercisesDetailsScreen from "./src/screens/predefinedWorkoutScreens/PredefinedExercisesDetailsScreen";
import PredefinedDaysScreen from "./src/screens/predefinedWorkoutScreens/PredefinedDaysScreen";
import AddExerciseScreen from "./src/screens/customWorkoutsScreens/AddExerciseScreen";
import AddWorkoutScreen from "./src/screens/customWorkoutsScreens/AddWorkoutScreen";
import EditExerciseScreen from "./src/screens/customWorkoutsScreens/EditExerciseScreen";
import EditWorkoutScreen from "./src/screens/customWorkoutsScreens/EditWorkoutScreen";
import WorkoutExercisesScreen from "./src/screens/customWorkoutsScreens/WorkoutExercisesScreen";
import WorkoutsMainScreen from "./src/screens/customWorkoutsScreens/WorkoutsMainScreen";
import AccountMainScreen from "./src/screens/accountScreens/AccountMainScreen";
import PlannerMainScreen from "./src/screens/plannerScreens/PlannerMainScreen";
import AddPlanScreen from "./src/screens/plannerScreens/AddPlanScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as PredefinedWorkoutProvider } from "./src/context/PredefinedWorkoutContext";
import { Provider as CustomWorkoutProvider } from "./src/context/CustomWorkoutContext";
import { Provider as CustomExercisesProvider } from "./src/context/CustomExercisesContext";
import { Provider as ExercisesCategoriesProvider } from "./src/context/ExerciseCategoriesContext";
import { Provider as ExercisesByCategoryProvider } from "./src/context/ExercisesByCategoryContext";
import { Provider as IdExerciseProvider } from "./src/context/IdExerciseContext";
import { Provider as PlannerProvider } from "./src/context/PlannerContext";
import { setNavigator } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/authorizationScreens/ResolveAuthScreen";
import {
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
  Feather
} from "react-native-vector-icons";

const switchNavigator = createSwitchNavigator({
  ResolveAuthScreen: ResolveAuthScreen,
  logInFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    predefinedWorkoutsFlow: {
      screen: createStackNavigator({
        PredefinedMain: PredefinedMainScreen,
        PredefinedDifficulty: PredefinedDifficultyScreen,
        PredefinedDays: PredefinedDaysScreen,
        PredefinedExercises: PredefinedExercisesScreen,
        PredefinedExercisesDetails: PredefinedExercisesDetailsScreen
      }),
      navigationOptions: {
        tabBarLabel: "Workouts",
        tabBarIcon: () => <Entypo name="flow-branch" style={{ fontSize: 28 }} />
      }
    },
    customWorkoutsFlow: {
      screen: createStackNavigator({
        WorkoutsMain: WorkoutsMainScreen,
        AddWorkout: AddWorkoutScreen,
        WorkoutExercises: WorkoutExercisesScreen,
        EditExercise: EditExerciseScreen,
        EditWorkout: EditWorkoutScreen,
        AddExercise: AddExerciseScreen
      }),
      navigationOptions: {
        tabBarLabel: "My Workouts",
        tabBarIcon: () => (
          <MaterialCommunityIcons name="weight-kilogram" style={{ fontSize: 28 }} />
        )
      }
    },
    plannerFlow: {
      screen: createSwitchNavigator({
        PlannerMain: PlannerMainScreen,
        AddPlan: AddPlanScreen
      }),
      navigationOptions: {
        tabBarLabel: "Planner",
        tabBarIcon: () => <AntDesign name="calendar" style={{ fontSize: 28 }} />
      }
    },
    userAccountFlow: {
      screen: createStackNavigator({
        AccountMain: AccountMainScreen
      }),
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: () => <Feather name="user" style={{ fontSize: 28 }} />
      }
    }
  })
});
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <PlannerProvider>
      <IdExerciseProvider>
        <ExercisesByCategoryProvider>
          <ExercisesCategoriesProvider>
            <CustomExercisesProvider>
              <CustomWorkoutProvider>
                <PredefinedWorkoutProvider>
                  <AuthProvider>
                    <App
                      ref={navigator => {
                        setNavigator(navigator);
                      }}
                    />
                  </AuthProvider>
                </PredefinedWorkoutProvider>
              </CustomWorkoutProvider>
            </CustomExercisesProvider>
          </ExercisesCategoriesProvider>
        </ExercisesByCategoryProvider>
      </IdExerciseProvider>
    </PlannerProvider>
  );
};
