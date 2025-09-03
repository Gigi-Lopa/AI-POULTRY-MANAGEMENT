import useAddVaccination from "@/hooks/useAddVaccination";
import styles from "@/styles/main";
import { VaccinationRecord } from "@/types";
import { Plus } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Alert from "../Alert";
import Spinner from "../Spinner";
import VaccinationCard from "../VaccinationCard";

interface props {
    openModal : () => void,
    closeModal : () => void,
    setVaccinations: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
    vaccinations : VaccinationRecord[]
};
function VaccinationContent({openModal, setVaccinations, vaccinations}: props) {
    const {
        status,
        USER_ID,
        getVaccinations,
        deleteVaccination
    } = useAddVaccination({ closeModal: () => {}, setVaccinations })

  useEffect(()=>{
    if (!USER_ID) return;
    getVaccinations()
  }, [USER_ID])

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
            <View style= {styles.mTop}>
                { 
                    vaccinations.length === 0 &&
                    status.loading && (
                    <View style={[styles.h30, styles.w100, styles.flexColumn, styles.centerItems]}>
                        <Spinner size="medium" />
                        <Text style={[styles.p]}>Loading...</Text>
                    </View>
                )
                }
                {
                !status.loading &&
                vaccinations.length === 0 
                && (
                    <View style={[styles.h30, styles.w100, styles.flexColumn, styles.centerItems]}>
                       <Alert message="No vaccinations recorded" variant="ghost"/>
                    </View>
                )
                }
                {
                    vaccinations.length !== 0 &&
                    vaccinations.map((v: VaccinationRecord, index: number)=> (
                        <VaccinationCard onDelete = {deleteVaccination} vaccination = {v} key={index}/>

                    ))
                }
            </View>
        </ScrollView>
    </View>
  )
}

export default VaccinationContent
