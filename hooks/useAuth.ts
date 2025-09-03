import { saveToCache } from "@/cache";
import { useRouter } from "expo-router";
import { useState } from "react";


export default function useAuth() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
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
      console.log("Login response:", data);
      if (data.isValid) {
          const token = {userID : data.user_id}
          saveToCache("token", token);
          router.navigate("/home/home")
        } else {
          setIsInvalid(true);
          setTimeout(()=> {setIsInvalid(false)}, 3500)
        }
        setLoading(false);

    } catch (error) {
      return { isValid: false, message: "Network error. Try again." };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isInvalid,
    handleChange,
    resetForm,
    login,
  };
}
