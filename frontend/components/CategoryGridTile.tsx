import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type CategoryGridTileType = {
  imageUrl: string;
  title: string;
  onPress: () => void;
};

function CategoryGridTile({ imageUrl, title, onPress }: CategoryGridTileType) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={styles.button}
        android_ripple={{ color: "#e7e5e532" }}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
  borderRadius: 8,
    margin: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 4,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    height: 140,
    width: "100%",
  },
});
