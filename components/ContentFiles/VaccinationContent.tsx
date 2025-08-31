import styles from "@/styles/main";
import { VaccinationRecord } from "@/types";
import { Plus } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import VaccinationCard from "../VaccinationCard";

interface props {
    openModal : () => void,
    setVaccinations: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
    vaccinations : VaccinationRecord[]
};
function VaccinationContent({openModal, setVaccinations, vaccinations}: props) {
  return (
    <View>
        <ScrollView>
            <View style={[styles.flexRow, styles.justifyBetween]}>
                <Text style={[styles.selfCenter, styles.h6, { marginTop: 2 }]}>
                    Journal Vaccination
                </Text>
                <TouchableOpacity style={[styles.normalButtonSM, styles.bg_success]} onPress={openModal}>
                    <View style={[styles.selfCenter, { marginRight: 10 }]}>
                        <Plus size={13} color={styles.bg_white.backgroundColor} />
                    </View>
                    <Text style={[styles.btnText, styles.text_white]}>
                        Record Vaccination
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <VaccinationCard />
            </View>
        </ScrollView>
    </View>
  )
}

export default VaccinationContent
