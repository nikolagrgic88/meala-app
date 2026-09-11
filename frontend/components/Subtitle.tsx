import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type SubtitleProps = {
  title: string;
  children: ReactNode;
};
function Subtitle({ title, children }: SubtitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{title}</Text>
      {children}
    </View>
  );
}

export default Subtitle;

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
});
