import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MealItem from "../../components/MealItem";
import { getCategories } from "../api/categoriesApi";
import { getMealsByCategory } from "../api/mealsApi";
import type { Meal } from "../models/Meal";

type MealsOverviewRouteParams = {
  id: string;
};

function MealsOverviewScreen() {
  const route =
    useRoute<RouteProp<Record<string, MealsOverviewRouteParams>, string>>();
  const navigation = useNavigation();
  const categoryId = route.params?.id;

  const [meals, setMeals] = useState<Meal[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("Meals");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [navigation, categoryTitle]);

  useEffect(() => {
    async function loadMeals() {
      if (!categoryId) {
        setError("Category ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const [mealsResult, categoriesResult] = await Promise.all([
          getMealsByCategory(categoryId),
          getCategories(),
        ]);

        setMeals(mealsResult);

        const selectedCategory = categoriesResult.find(
          (category) => category.groupId === categoryId,
        );

        setCategoryTitle(selectedCategory?.title ?? "Meals");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load meals";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMeals();
  }, [categoryId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading meals...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (meals.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No meals found for this category.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={meals}
        renderItem={({ item }) => <MealItem itemData={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  errorText: {
    color: "#b00020",
    textAlign: "center",
  },
});
