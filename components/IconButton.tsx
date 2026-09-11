import { Pressable } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

type IconButtonProps = {
  isSaved: boolean;
};

function IconButton({ isSaved }: IconButtonProps) {
  return (
    <Pressable>
      <Ionicons
        name={isSaved ? "bookmark" : "bookmark-outline"}
        size={24}
        color="black"
      />
    </Pressable>
  );
}

export default IconButton;
