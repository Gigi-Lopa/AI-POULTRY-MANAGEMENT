import Alert from "@/components/Alert";
import DropdownComponent from "@/components/Dropdown";
import useAddFlock from "@/hooks/useAddFlock";
import styles from "@/styles/main";
import type {
  FlockResponse
} from "@/types/index";
import {
  flockBreeds,
  flockPurposes
} from "@/types/index";
import { Bird, Plus } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface props{
  closeModal: () => void;
  setFlocks : React.Dispatch<React.SetStateAction<FlockResponse[]>>;
}

const AddFlockForm = ({closeModal, setFlocks} : props) => {
  const {
    validationForm,
    formData,
    breedType,
    breadPurpose,
    status,
    validate,
    updateBreedPurpose,
    updateBreedType,
    handleChange,
  } = useAddFlock({closeModal, setFlocks});

  return (
    <View>
      <Text style={[styles.p]}>
        Enter the details for your new poultry flock.
      </Text>
      <View style={{ marginTop: 10 }}>
        <View>
          <Text style={[styles.h6]}>Flock Name</Text>
          <TextInput
            style={[
              styles.defaultInput,
              validationForm.flockName ? styles.inputError : "",
            ]}
            placeholder="e.g Flock Layer C"
            value={formData.flockName}
            onChangeText={(text) => handleChange("flockName", text)}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Select Bread type</Text>
          <DropdownComponent
            data={flockBreeds}
            Icon={Bird}
            value={breedType ?? ""}
            onChangeValue={updateBreedType}
          />
        </View>
        <View
          style={[styles.flexRow, styles.justifyBetween, { marginTop: 10 }]}
        >
          <View style={[{ width: "45%" }]}>
            <Text style={[styles.h6]}>Number of birds</Text>
            <TextInput
              style={[
                styles.defaultInput,
                validationForm.numberOfBirds ? styles.inputError : "",
              ]}
              value={formData.numberOfBirds}
              onChangeText={(text) => handleChange("numberOfBirds", text)}
            />
          </View>
          <View style={[{ width: "45%" }]}>
            <Text style={[styles.h6]}>Age </Text>
            <TextInput
              style={[
                styles.defaultInput,
                validationForm.age ? styles.inputError : "",
              ]}
              placeholder="e.g 2 weeks"
              value={formData.age}
              onChangeText={(text) => handleChange("age", text)}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.h6]}>Location / Coop</Text>
          <TextInput
            style={[
              styles.defaultInput,
              validationForm.locationCoop ? styles.inputError : "",
            ]}
            value={formData.locationCoop}
            onChangeText={(text) => handleChange("locationCoop", text)}
            placeholder="e.g Coop 1"
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.h6}>Select Flock Purpose</Text>
          <DropdownComponent
            data={flockPurposes}
            value={breadPurpose ?? ""}
            onChangeValue={updateBreedPurpose}
            Icon={Bird}
          />
        </View>
        {
          status.error &&
          <Alert message="An error occurred." variant="danger"/>
        }
        <TouchableOpacity
          style={[
            { marginTop: 15 },
            status.loading ?
            styles.bg_success_30 :
            styles.bg_success,
            styles.buttonSM,
            styles.flexRow,
            styles.centerItems,
          ]}
          disabled = {status.loading}
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
            Add Flock
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddFlockForm;
