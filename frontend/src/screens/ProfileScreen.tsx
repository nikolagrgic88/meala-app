import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import type { ComponentProps } from "react";
import Ionicons from "@react-native-vector-icons/ionicons";

import { useAuthStore } from "../store/authStore";
import ProfileButton from "../../components/ProfileButton";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigation = useNavigation();

  function handleUpdateDetails() {
    /*
      TODO
      navigation.navigate("UpdateProfile");
    */

    Alert.alert("Coming Soon", "Update profile details will be added next.");
  }

  function handleSavedMeals() {
    navigation.navigate("SavedMeals");
  }

  function handleMyMeals() {
    navigation.navigate("MyMeals");
  }

  function handleLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: logout,
      },
    ]);
    showMessage({
      message: "Logged Out Successfully",
      type: "success",
      backgroundColor: "#2e7d32",
      color: "#ffffff",
      duration: 3000,
      icon: "success",
    });
  }

  const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <View style={styles.screen}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials || "U"}</Text>
        </View>

        <Text style={styles.welcomeText}>Welcome back</Text>

        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>

        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <ProfileButton
          title="Update Details"
          subtitle="Change your name and account information"
          icon="person-outline"
          onPress={handleUpdateDetails}
        />
        <ProfileButton
          title="Saved Meals"
          subtitle="View meals you have saved"
          icon="bookmark-outline"
          onPress={handleSavedMeals}
        />
        <ProfileButton
          title="My Meals"
          subtitle="View recipes you have created"
          icon="restaurant-outline"
          onPress={handleMyMeals}
        />
        <ProfileButton
          title="Log Out"
          subtitle="Sign out of your account"
          icon="log-out-outline"
          onPress={handleLogout}
          danger
        />
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  profileSection: {
    alignItems: "center",
    paddingVertical: 28,
  },

  avatar: {
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 46,
    backgroundColor: "#e85d04",
    marginBottom: 16,
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },

  welcomeText: {
    color: "#777777",
    fontSize: 14,
  },

  name: {
    marginTop: 4,
    color: "#222222",
    fontSize: 24,
    fontWeight: "bold",
  },

  email: {
    marginTop: 5,
    color: "#666666",
    fontSize: 15,
  },

  menu: {
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
});
