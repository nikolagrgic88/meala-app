import { FlashList } from "@shopify/flash-list";
import { StyleSheet, Text, View } from "react-native";

import MealItem from "../../components/MealItem";
import { useAuthStore } from "../store/authStore";
import { Meal } from "../models/Meal";

function SavedMealsScreen() {
  const user = useAuthStore((state) => state.user);

  const bookmarkedMealIds = user?.bookmarkedMealIds ?? [];

  if (bookmarkedMealIds.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyTitle}>No Saved Meals</Text>

        <Text style={styles.emptyMessage}>Meals you bookmark will appear here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={bookmarkedMealIds as unknown as Meal[]}
        keyExtractor={(item: Meal) => item.id}
        renderItem={({ item }) => <MealItem itemData={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

export default SavedMealsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  listContent: {
    paddingVertical: 12,
  },

  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
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
