import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  onPress: () => void;
  isLoading: boolean;
  children: ReactNode;
};
function Button({ onPress, isLoading, children }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, isLoading && styles.buttonDisabled]}
    >
      {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>{children}</Text>}
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#e85d04",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
