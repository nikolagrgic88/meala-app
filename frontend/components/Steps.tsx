import { StyleSheet, Text, View } from "react-native";
import Subtitle from "./Subtitle";
import Meal from "../meal";

type StepsProps = {
  meal: Meal;
};
function Steps({ meal }: StepsProps) {
  return (
    <Subtitle title="Steps">
      {meal.steps.map((step: string, index: number) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.itemText}>
            {index + 1}. {step}
          </Text>
        </View>
      ))}
    </Subtitle>
  );
}

export default Steps;
const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 20,
    marginVertical: 4,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
