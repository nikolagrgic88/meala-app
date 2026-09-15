import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { authenticate } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { ApiError } from "../api/apiError";
import Button from "../../components/Button";
import { showMessage } from "react-native-flash-message";

function LoginScreen() {
  const navigation = useNavigation();

  const setSession = useAuthStore((state) => state.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await authenticate({
        email: email.trim(),
        password,
      });
      showMessage({
        message: "Logged In Successfully",
        description: "Welcome back!",
        type: "success",
        backgroundColor: "#2e7d32",
        color: "#ffffff",
        duration: 3000,
        icon: "success",
      });
      setSession(response.user, response.accessToken);
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.message);
      } else {
        setError("Unable to log in.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function openSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>Log in to save and create recipes.</Text>

        <Text style={styles.label}>Email</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={!isLoading}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          editable={!isLoading}
          style={styles.input}
          onSubmitEditing={handleLogin}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Button onPress={handleLogin} isLoading={isLoading}>
          Log in
        </Button>

        <View style={styles.footer}>
          <Text>Do not have an account? </Text>

          <Pressable onPress={openSignUp}>
            <Text style={styles.linkText}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 30,
    color: "#666666",
    textAlign: "center",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    height: 50,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
  },

  errorText: {
    marginBottom: 16,
    color: "#b00020",
    textAlign: "center",
  },

  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    color: "#e85d04",
    fontWeight: "bold",
  },
});
