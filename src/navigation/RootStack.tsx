import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import MealsOverviewScreen from "../screens/MealsOverviewScreen";
import { StaticParamList } from "@react-navigation/native";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import { Text } from "react-native";

export const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {},
  },
  screens: {
    Home: {
      screen: CategoriesScreen,
      options: {
        title: "All Categories",
      },
    },
    MealsOverviewScreen: {
      screen: MealsOverviewScreen,
      if: () => true,
    },
    MealDetails: {
      screen: MealDetailsScreen,
      // options: { headerRight: () => <Text>Hello </Text> },
    },
  },
});
type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
