import {  StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import CategoryGridTile from "../../components/CategoryGridTile";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

import Loading from "../../components/Loading";
import Error from "../../components/Error";
import useCategories from "../hooks/useCategories";

function CategoriesScreen() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { categories, isLoading, error } = useCategories();

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

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
