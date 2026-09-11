import { createStaticNavigation } from "@react-navigation/native";
import { RootStack } from "./navigation/RootStack";
import { StatusBar } from "react-native";

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <>
      <Navigation />
    </>
  );
}
