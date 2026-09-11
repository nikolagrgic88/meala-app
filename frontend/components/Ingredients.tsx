import { StyleSheet, Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";

import { useState, type ReactNode } from "react";
import Meal from "../meal";
import Subtitle from "./Subtitle";

type SubtitleProps = {
  meal?: Meal;
};

function Ingredients({ meal }: SubtitleProps) {
  const [checkedIndices, setCheckedIndices] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setCheckedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  return (
    <Subtitle title="Ingredients">
      {meal?.ingredients.map((ingredient: string, index: number) => {
        const isChecked = checkedIndices.includes(index);

        return (
          <View key={index} style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={() => toggleCheck(index)}
            />
            <Text style={[styles.paragraph, isChecked && styles.checkedText]}>
              {ingredient}
            </Text>
          </View>
        );
      })}
    </Subtitle>
  );
}

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 10,
    paddingBottom: 5,
    textAlign: "center",
    borderBottomWidth: 2,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 18,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
