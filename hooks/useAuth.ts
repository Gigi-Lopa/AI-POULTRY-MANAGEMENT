//import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";


export default function useAuth() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  /* const saveUserId = async (userId: string) => {
    try {
      await AsyncStorage.setItem("user_id", userId);
    } catch (error) {
      console.error("Error saving user_id", error);
    }
  }; */

  const handleChange = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setUser({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const login = async () => {
    if (!user.email || !user.password) {
      return { isValid: false, message: "Email and password required" };
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return { isValid: false, message: "Network error. Try again." };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    //saveUserId,
    handleChange,
    resetForm,
    login,
  };
}
