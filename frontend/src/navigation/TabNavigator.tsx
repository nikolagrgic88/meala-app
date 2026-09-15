import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@react-native-vector-icons/ionicons";

import CategoriesScreen from "../screens/CategoriesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AuthStack } from "./AuthStack";

import { useIsAuthenticated, useIsNotAuthenticated } from "../hooks/useAuthNavigation";

export const TabNavigator = createBottomTabNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    tabBarActiveTintColor: "tomato",
    tabBarInactiveTintColor: "gray",
  },

  screens: {
    Categories: {
      screen: CategoriesScreen,

      options: {
        title: "Categories",

        tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
      },
    },

    Account: {
      if: useIsNotAuthenticated,
      screen: AuthStack,
      options: {
        title: "Login",
        headerShown: false,

        tabBarIcon: ({ color, size }) => <Ionicons name="log-in" size={size} color={color} />,
      },
    },

    Profile: {
      if: useIsAuthenticated,
      screen: ProfileScreen,

      options: {
        title: "Profile",

        tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
      },
    },
  },
});
