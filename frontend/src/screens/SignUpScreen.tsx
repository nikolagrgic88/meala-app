import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { registerUser } from "../api/authApi";
import { ApiError } from "../api/apiError";
import Button from "../../components/Button";
import { showMessage } from "react-native-flash-message";

function SignUpScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp() {
    const cleanedFirstName = firstName.trim();
    const cleanedLastName = lastName.trim();
    const cleanedEmail = email.trim();

    if (!cleanedFirstName || !cleanedLastName || !cleanedEmail || !password || !confirmPassword) {
      setError("Please complete every field.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await registerUser({
        firstName: cleanedFirstName,
        lastName: cleanedLastName,
        email: cleanedEmail,
        password,
        confirmPassword,
      });
      showMessage({
        message: "Account Created",
        description: "Your account was created successfully. You can now log in.",
        type: "success",
        backgroundColor: "#2e7d32",
        color: "#ffffff",
        duration: 3000,
        icon: "success",
      });

      navigation.goBack();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.message);
      } else {
        setError("Unable to create the account.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>Sign up to save and create recipes.</Text>

        <Text style={styles.label}>First name</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First name"
          autoCapitalize="words"
          textContentType="givenName"
          editable={!isLoading}
          style={styles.input}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last name"
          autoCapitalize="words"
          textContentType="familyName"
          editable={!isLoading}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={!isLoading}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="At least 8 characters"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="newPassword"
          editable={!isLoading}
          style={styles.input}
        />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Enter the password again"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="newPassword"
          editable={!isLoading}
          style={styles.input}
          onSubmitEditing={handleSignUp}
        />

        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Button onPress={handleSignUp} isLoading={isLoading}>
          Create Account
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => navigation.goBack()} disabled={isLoading}>
            <Text style={styles.linkText}>Log In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222222",
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
    color: "#333333",
  },
  input: {
    height: 50,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ffecec",
  },
  errorText: {
    color: "#b00020",
    textAlign: "center",
  },
  footer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  footerText: {
    color: "#666666",
  },
  linkText: {
    color: "#e85d04",
    fontWeight: "bold",
  },
});
