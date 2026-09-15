import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Ingredients from "../../components/Ingredients";
import Steps from "../../components/Steps";
import IconButton from "../../components/IconButton";
import useMeal from "../hooks/useMeal";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

type MealDetailsParams = {
  mealId: string;
};

function MealDetailsScreen() {
  const route =
    useRoute<RouteProp<Record<string, MealDetailsParams>, string>>();

  const navigation = useNavigation();
  const mealId = route.params?.mealId;
  console.log("mealId:", mealId);
  const { error, isLoading, meal } = useMeal(mealId);
  console.log(error, isLoading, meal);

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

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

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
