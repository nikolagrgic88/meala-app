import { StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";

export const AuthStack = createNativeStackNavigator({
  initialRouteName: "Login",

  screenOptions: {
    headerTitleAlign: "center",
  },

  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        title: "Login",
      },
    },

    SignUp: {
      screen: SignUpScreen,
      options: {
        title: "Create Account",
      },
    },
  },
});

export type AuthStackParamList = StaticParamList<typeof AuthStack>;
