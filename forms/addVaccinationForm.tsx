import Alert from "@/components/Alert";
import DropdownComponent from "@/components/Dropdown";
import InputSearch from "@/components/InputSearch";
import useAddVaccination from "@/hooks/useAddVaccination";
import styles from "@/styles/main";
import type { VaccinationRecord } from "@/types/index";
import { VaccinationRoute, VaccinationType } from "@/types/index";
import { Bird, Plus } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface props {
  closeModal: () => void;
  setVaccinations: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
}

const AddVaccinationForm = ({ closeModal, setVaccinations }: props) => {
  const {
    validationForm,
    formData,
    status,
    validate,
    updateRoute,
    updateVaccineType,
    handleChange,
  } = useAddVaccination({ closeModal, setVaccinations});

  return (
    <View>
      <Text style={[styles.p]}>
        Enter the details for the new vaccination.
      </Text>
      <View style={{ marginTop: 10 }}>
        <InputSearch
          handleChange={handleChange}
          label="Search Flock"
          placeholder="e.g. Flock One"
        />
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Vaccine Name</Text>
          <TextInput
            style={[
              styles.defaultInput,
              validationForm.vaccineName ? styles.inputError : "",
            ]}
            placeholder="e.g Newcastle Disease Vaccine (Lasota)"
            value={formData.vaccineName}
            onChangeText={text => handleChange("vaccineName" as any, text)}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Vaccine Type</Text>
          <DropdownComponent
            data={VaccinationType}
            Icon={Bird}
            value={formData.vaccineType ?? ""}
            onChangeValue={updateVaccineType}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Manufacturer</Text>
          <TextInput
            style={[
              styles.defaultInput,
              validationForm.manufacturer ? styles.inputError : "",
            ]}
            placeholder="e.g Zoetis"
            value={formData.manufacturer}
            onChangeText={text => handleChange("manufacturer" as any, text)}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Dosage</Text>
          <TextInput
            style={[
              styles.defaultInput,
              validationForm.dosage ? styles.inputError : "",
            ]}
            placeholder="e.g 0.03 ml per bird"
            value={formData.dosage}
            onChangeText={text => handleChange("dosage" as any, text)}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Route</Text>
          <DropdownComponent
            data={VaccinationRoute}
            Icon={Bird}
            value={formData.route ?? ""}
            onChangeValue={updateRoute}
          />
        </View>

        {status.error && <Alert message="An error occurred." variant="danger" />}

        <TouchableOpacity
          style={[
            { marginTop: 15 },
            styles.bg_success,
            styles.buttonSM,
            styles.flexRow,
            styles.centerItems,
          ]}
          disabled={status.loading}
          onPress={validate}
        >
          <View>
            <Plus
              size={10}
              color={styles.bg_white.backgroundColor}
              style={{ marginBottom: 1 }}
            />
          </View>
          <Text style={[styles.btnText, styles.text_white, { marginLeft: 8 }]}>
            Add Vaccination
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddVaccinationForm;
