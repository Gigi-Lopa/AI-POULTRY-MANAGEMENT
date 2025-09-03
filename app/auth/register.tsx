import { saveToCache } from "@/cache";
import Alert from "@/components/Alert";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/main";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const { user, handleChange, resetForm } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!user.fullname || !user.email || !user.password || !user.confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: user.fullname,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        resetForm();

        const token = {userID : data.user_id}
        saveToCache("token", token);
        router.navigate("/home/home");
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("Network error. Try again.");
    }
    finally {
      setLoading(false);
    }

    setTimeout(() => setErrorMessage(null), 3500);
  };

  return (
    <View style={[styles.screen, styles.container, { paddingTop: 50 }]}>
      <View style={[styles.h100, styles.w100]}>
        <Text style={[styles.h3, styles.text_success, { marginBottom: 15 }]}>
          Create Account
        </Text>

        <View style={[styles.formGroup]}>
          <Text style={[styles.h6]}>Full Name</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.fullname}
            onChangeText={(text) => handleChange("fullname", text)}
          />
        </View>

        <View style={[styles.formGroup, { marginTop: 10 }]}>
          <Text style={[styles.h6]}>Email</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.formGroup, { marginTop: 10 }]}>
          <Text style={[styles.h6]}>Password</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </View>

        <View style={[styles.formGroup, { marginTop: 10 }]}>
          <Text style={[styles.h6]}>Confirm Password</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
          />
        </View>

        {errorMessage && (
          <View style={{ marginTop: 15 }}>
            <Alert message={errorMessage} variant="danger" />
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            loading ? styles.bg_success_30 :  
            styles.bg_success,
            styles.centerItems,
            { marginTop: 20, padding: 12 },
          ]}
          disabled={loading}
          onPress={handleSubmit}
        >
          <Text style={[styles.h6, { color: "#fff", textAlign: "center" }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
