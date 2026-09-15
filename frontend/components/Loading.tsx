import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

function Loading() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
      <Text>Loading meals...</Text>
    </View>
  );
}

export default Loading;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
});
