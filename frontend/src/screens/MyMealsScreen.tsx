import { FlashList } from "@shopify/flash-list";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import MealItem from "../../components/MealItem";
import { useAuthStore } from "../store/authStore";
import { Meal } from "../models/Meal";

function MyMealsScreen() {
  const navigation = useNavigation();

  const user = useAuthStore((state) => state.user);

  const recipeIds = user?.recipeIds ?? [];

  function handleAddMeal() {
    /*
     TODO

      navigation.navigate("AddMeal");
    */
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>My Meals</Text>

          <Text style={styles.count}>
            {recipeIds.length} {recipeIds.length === 1 ? "recipe" : "recipes"}
          </Text>
        </View>

        <Pressable onPress={handleAddMeal} style={({ pressed }) => [styles.addButton, pressed && styles.buttonPressed]}>
          <Text style={styles.addButtonText}>Add Meal</Text>
        </Pressable>
      </View>

      {recipeIds.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>No Recipes Yet</Text>

          <Text style={styles.emptyMessage}>Recipes you create will appear here.</Text>
        </View>
      ) : (
        <FlashList
          data={recipeIds as unknown as Meal[]}
          keyExtractor={(item: Meal) => item.id}
          renderItem={({ item }) => <MealItem itemData={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

export default MyMealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
  },

  heading: {
    color: "#222222",
    fontSize: 22,
    fontWeight: "bold",
  },

  count: {
    marginTop: 3,
    color: "#777777",
    fontSize: 14,
  },

  addButton: {
    minHeight: 42,
    justifyContent: "center",
    borderRadius: 9,
    paddingHorizontal: 16,
    backgroundColor: "#e85d04",
  },

  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  listContent: {
    paddingVertical: 12,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    color: "#222222",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  emptyMessage: {
    marginTop: 8,
    color: "#777777",
    fontSize: 15,
    textAlign: "center",
  },
});
