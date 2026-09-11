import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getCategories } from "../api/categoriesApi";
import { FlashList } from "@shopify/flash-list";
import CategoryGridTile from "../../components/CategoryGridTile";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Category } from "../models/Category";

function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);
        const results = await getCategories();
        setCategories(results);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load categories";

        setError(message);
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />

        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlashList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <CategoryGridTile
            title={item.title}
            imageUrl={item.imageUrl}
            onPress={() =>
              navigation.navigate("MealsOverviewScreen", { id: item.groupId })
            }
          />
        )}
      />
    </View>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { height: 60, padding: 20, borderBottomWidth: 1, borderColor: "#ccc" },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
