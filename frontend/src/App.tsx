import { createStaticNavigation } from "@react-navigation/native";
import { RootStack } from "./navigation/RootStack";
import FlashMessage from "react-native-flash-message";

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <>
      <FlashMessage position="center" />
      <Navigation />
    </>
  );
}
