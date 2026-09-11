import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Meal from "../meal";
import { useNavigation } from "@react-navigation/native";


type MealItemProps = {
  itemData: Meal;
};

function MealItem({ itemData }: MealItemProps) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#e7e5e564" }}
        onPress={() =>
          navigation.navigate("MealDetails", { mealId: itemData.id })
        }
      >
        <View>
          <Image style={styles.image} source={{ uri: itemData.imageUrl }} />
          <Text style={styles.title}>{itemData.title}</Text>
        </View>
       
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    borderRadius: 8,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    padding: 8,
  },

});
