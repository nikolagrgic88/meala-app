import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ingredients from "../../components/Ingredients";
import Steps from "../../components/Steps";
import IconButton from "../../components/IconButton";
import { getMealById } from "../api/mealsApi";
import type { Meal } from "../models/Meal";

type MealDetailsParams = {
  mealId: string;
};

function MealDetailsScreen() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const route =
    useRoute<RouteProp<Record<string, MealDetailsParams>, string>>();

  const navigation = useNavigation();

  const mealId = route.params?.mealId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton isSaved={false} />,
    });
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal?.title ?? "Meal Details",
    });
  }, [navigation, meal?.title]);

  useEffect(() => {
    async function loadMeal() {
      if (!mealId) {
        setError("Meal ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const result = await getMealById(mealId);

        setMeal(result);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load meal";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadMeal();
  }, [mealId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading meal...</Text>
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

  if (!meal) {
    return (
      <View style={styles.centered}>
        <Text>Meal not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />

        <Text style={styles.title}>{meal.title}</Text>

        <View style={styles.details}>
          <Text style={styles.detailText}>{meal.duration}m</Text>

          <Text style={styles.detailText}>{meal.complexity.toUpperCase()}</Text>

          <Text style={styles.detailText}>
            {meal.affordability.toUpperCase()}
          </Text>
        </View>

        <Ingredients meal={meal} />
        <Steps meal={meal} />
      </ScrollView>
    </View>
  );
}

export default MealDetailsScreen;

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
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    margin: 12,
  },
  details: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "#b00020",
    textAlign: "center",
  },
});
