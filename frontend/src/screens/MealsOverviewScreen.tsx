import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MealItem from "../../components/MealItem";
import useMeals from "../hooks/useMeals";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

type MealsOverviewRouteParams = {
  id: string;
};

function MealsOverviewScreen() {
  const route =
    useRoute<RouteProp<Record<string, MealsOverviewRouteParams>, string>>();
  const navigation = useNavigation();
  const categoryId = route.params?.id;
  const { categoryTitle, error, isLoading, meals } = useMeals(categoryId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [navigation, categoryTitle]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
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
});
