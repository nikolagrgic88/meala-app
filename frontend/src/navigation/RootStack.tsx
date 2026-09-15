import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StaticParamList } from "@react-navigation/native";
import { TabNavigator } from "./TabNavigator";
import MealsOverviewScreen from "../screens/MealsOverviewScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MyMealsScreen from "../screens/MyMealsScreen";
import SavedMealsScreen from "../screens/SavedMealsScreen";

export const RootStack = createNativeStackNavigator({
  initialRouteName: "Tabs",
  screenOptions: {
    headerTitleAlign: "center",
  },
  screens: {
    Tabs: {
      screen: TabNavigator,
      options: {
        headerShown: false,
      },
    },
    MealsOverviewScreen: {
      screen: MealsOverviewScreen,
    },
    MealDetails: {
      screen: MealDetailsScreen,
    },
    AccountDetails: {
      screen: ProfileScreen,
      options: {
        title: "Profile",
      },
    },
    SignUp: {
      screen: SignUpScreen,
    },
    SavedMeals: {
      screen: SavedMealsScreen,
      options: {
        title: "Saved Meals",
      },
    },

    MyMeals: {
      screen: MyMealsScreen,
      options: {
        title: "My Meals",
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
