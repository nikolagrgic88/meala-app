import Ionicons from "@react-native-vector-icons/ionicons";
import { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProfileButtonProps = {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  danger?: boolean;
};

function ProfileButton({ title, subtitle, icon, onPress, danger = false }: ProfileButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
      <View style={[styles.iconContainer, danger && styles.dangerIconContainer]}>
        <Ionicons name={icon} size={24} color={danger ? "#b00020" : "#e85d04"} />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={[styles.menuTitle, danger && styles.dangerText]}>{title}</Text>

        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={21} color="#999999" />
    </Pressable>
  );
}

export default ProfileButton;

const styles = StyleSheet.create({
  menu: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },

  menuItem: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#dddddd",
  },

  menuItemPressed: {
    backgroundColor: "#f2f2f2",
  },

  iconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#fff0e6",
  },

  dangerIconContainer: {
    backgroundColor: "#ffecec",
  },
  menuTextContainer: {
    flex: 1,
    marginHorizontal: 14,
  },
  menuTitle: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "600",
  },

  menuSubtitle: {
    marginTop: 3,
    color: "#777777",
    fontSize: 13,
  },

  dangerText: {
    color: "#b00020",
  },
});
