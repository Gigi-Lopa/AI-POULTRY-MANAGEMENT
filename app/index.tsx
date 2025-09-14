import { loadFromCache } from "@/cache";
import Spinner from "@/components/Spinner";
import styles from "@/styles/main";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Bird } from "lucide-react-native";
import { useState } from "react";
import { LogBox, Text, TouchableOpacity, View } from "react-native";
LogBox.ignoreAllLogs();

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  async function checkLoginStatus() {
    setLoading(true);
    const token = await loadFromCache("token");
    
    setLoading(false)
    if(token !==  null) return router.navigate("/home/home");
    router.navigate("/auth/login");
  }

  return (
    <View style={[styles.screen, styles.container]}>
      <StatusBar style="dark"/>
      <View style={[styles.h100]}>
        <View style={[styles.h60, styles.centerItems]}>
          <View style={[styles.iconContainer, styles.bg_success_30]}>
            <Bird color={styles.text_success.color} />
          </View>
          <View>
            <Text style={[styles.h3, styles.textCenter, styles.text_success]}>
              AI Poultry Management
            </Text>
            <Text style={[styles.p, styles.textCenter]}>
              Real-time data analysis and insights to optimize flock health,
              productivity, and resource management
            </Text>
          </View>
        </View>
        <View style={[styles.h20, styles.justifyBetween]}>
          <TouchableOpacity
            disabled = {loading}
            style={[styles.button, styles.bg_success, styles.centerItems]}
            onPress={() => checkLoginStatus()}
          >
            {
              loading ?
              <Spinner size="small"/> :
              <Text style={[styles.textCenter, styles.buttonText]}>Login</Text>
            }
          </TouchableOpacity>
          <View style={[]}>
            <Text style={[styles.p, styles.textCenter]}>Or</Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonOutline]}
            
            onPress={() => router.navigate("/auth/register")}
          >
            <Text style={[styles.textCenter, styles.buttonTextOutline, styles.text_success]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
