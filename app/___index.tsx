import styles from "@/styles/main";
import { useRouter } from "expo-router";
import { Bird } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View style={[styles.screen, styles.container]}>
      <View style={[styles.h100]}>
        <View style={[styles.h60, styles.centerItems]}>
          <View style={[styles.iconContainer, styles.bg_blue_30]}>
            <Bird color={styles.text_blue.color} />
          </View>
          <View>
            <Text style={[styles.h3, styles.textCenter, styles.text_blue]}>
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
            style={[styles.button]}
            onPress={() => router.navigate("/auth/login")}
          >
            <Text style={[styles.textCenter, styles.buttonText]}>Login</Text>
          </TouchableOpacity>
          <View style={[]}>
            <Text style={[styles.p, styles.textCenter]}>Or</Text>
          </View>
          <TouchableOpacity
            style={[styles.buttonOutline]}
            onPress={() => router.navigate("/auth/register")}
          >
            <Text style={[styles.textCenter, styles.buttonTextOutline]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
