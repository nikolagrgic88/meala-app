import { StyleSheet, Text, View } from "react-native";

type MealDetailsProps = {
  duration: number;
  complexity: string;
  affordability: string;
};
function MealDetails({
  duration,
  complexity,
  affordability,
}: MealDetailsProps) {
  return (
    <View style={styles.details}>
      <Text>{duration}</Text>
      <Text>{complexity}</Text>
      <Text>{affordability}</Text>
    </View>
  );
}

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-evenly",
    fontSize: 12,
  },
});
