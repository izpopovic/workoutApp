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

const switchNavigator = createSwitchNavigator({
  // when we enter this flow we gonna show stack navigator
  // and inside this stack nav we want to toggle between...
  ResolveAuthScreen: ResolveAuthScreen,
  logInFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  mainFlow: createBottomTabNavigator({
    predefinedWorkoutsFlow: createStackNavigator({
      PredefinedMain: PredefinedMainScreen,
      PredefinedDifficulty: PredefinedDifficultyScreen,
      PredefinedDays: PredefinedDaysScreen,
      PredefinedExercises: PredefinedExercisesScreen,
      PredefinedExercisesDetails: PredefinedExercisesDetailsScreen
    }),
    customWorkoutsFlow: createStackNavigator({
      WorkoutsMain: WorkoutsMainScreen,
      AddWorkout: AddWorkoutScreen,
      WorkoutExercises: WorkoutExercisesScreen,
      EditExercise: EditExerciseScreen,
      EditWorkout: EditWorkoutScreen,
      AddExercise: AddExerciseScreen
    }),
    plannerFlow: createStackNavigator({
      PlannerMain: PlannerMainScreen
    }),
    userAccountFlow: createStackNavigator({
      AccountMain: AccountMainScreen
    })

    // profile tab navigator
    // planner tab navigator
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
