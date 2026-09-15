import { StyleSheet, Text, View } from "react-native";

type ErrorProps = {
  error: string;
};

function Error({ error }: ErrorProps) {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

export default Error;

const styles = StyleSheet.create({
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
