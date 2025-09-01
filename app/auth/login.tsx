import Alert from "@/components/Alert";
import useAuth from "@/hooks/useAuth";
import styles from "@/styles/main";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { user, handleChange, login, /* saveUserId */ } = useAuth();
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true); 
    const result:any = login();
    
    if (result.success) {
     // await saveUserId(result.user_id);
      router.navigate("/home/home")
    } else {
      setIsInvalid(true);
      setTimeout(()=> {setIsInvalid(false)}, 3500)
    }
    setLoading(false);
  };

  return (
    <View style={[styles.screen, styles.container, { paddingTop: 50 }]}>
      <View style={[styles.h100, styles.w100]}>
        <Text style={[styles.h3, styles.text_success, { marginBottom: 15 }]}>
          Sign In
        </Text>

        <View style={[styles.formGroup]}>
          <Text style={[styles.h6]}>Email</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.formGroup, {marginTop : 10}]}>
          <Text style={[styles.h6]}>Password</Text>
          <TextInput
            style={[styles.defaultInput]}
            value={user.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
        </View>
        { 
          isInvalid &&
          <View style ={{marginTop :15}}>
            <Alert message="Invalid Credentials" variant="danger"/>
          </View>
        }
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
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
