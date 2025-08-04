import DropdownComponent from "@/components/Dropdown";
import styles from "@/styles/main";
import type {
  FlockFormData,
  FlockFormDataValidation,
  flockSelective,
} from "@/types/index";
import { Bird, Plus } from "lucide-react-native";
import React, { useState } from "react";
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const AddFlockForm = () => {
  const flockBreeds: flockSelective[] = [
    { label: "Broiler Chicken", value: "broiler" },
    { label: "Layer Chicken", value: "layer" },
    { label: "Free-Range Chicken", value: "free_range" },
    { label: "Roadrunner (Huku)", value: "roadrunner" },
    { label: "Quail", value: "quail" },
    { label: "Guinea Fowl", value: "guinea_fowl" },
    { label: "Turkey", value: "turkey" },
    { label: "Duck", value: "duck" },
  ];
  const flockPurposes: flockSelective[] = [
    { label: "Egg production (Layers)", value: "egg_production" },
    { label: "Meat production (Broilers)", value: "meat_production" },
    { label: "Breeding", value: "breeding" },
    { label: "Mixed Purposes", value: "mixed_purposes" },
  ];
  const [breedType, setBreedType] = useState<string>();
  const [breadPurpose, setBreedPurpose] = useState<string>();
  const [userID, setUserID] = useState("6887d714a07f7b6a5fecec73");

  const updateBreedPurpse = (item: string): void => {
    setBreedPurpose(item);
  };
  const updateBreedType = (item: string): void => {
    setBreedType(item);
  };

  const [formData, setFormData] = useState<FlockFormData>({
    flockName: "",
    numberOfBirds: "",
    age: "",
    locationCoop: "",
  });

  const [validationForm, setValidationForm] = useState<FlockFormDataValidation>(
    {
      flockName: false,
      numberOfBirds: false,
      age: false,
      locationCoop: false,
    }
  );

  const handleChange = (
    field: keyof FlockFormData,
    value: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      if (!value || value.trim().length === 0) {
        isValid = false;
        setValidationForm((prev) => ({
          ...prev,
          key: true,
        }));
      } else {
        setValidationForm((prev) => ({
          ...prev,
          key: false,
        }));
      }
    });

    if (isValid) {
      fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userID, // remove after login is working
          flockName: formData.flockName,
          breedType: breedType,
          numberOfBirds: formData.numberOfBirds,
          age: formData.age,
          locationCoop: formData.locationCoop,
          flockPurpose: breadPurpose,
        }),
      })
        .then((respoonse) => respoonse.json())
        .then((response) => {
          if (response?.success) {
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {}); // clean up
    }
  };

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
            onChange={(text) => handleChange("flockName", text)}
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
              onChange={(text) => handleChange("numberOfBirds", text)}
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
              onChange={(text) => handleChange("age", text)}
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
            onChange={(text) => handleChange("locationCoop", text)}
            placeholder="e.g Coop 1"
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={styles.h6}>Select Flock Purpose</Text>
          <DropdownComponent
            data={flockPurposes}
            value={breadPurpose ?? ""}
            onChangeValue={updateBreedPurpse}
            Icon={Bird}
          />
        </View>
        <TouchableOpacity
          style={[
            { marginTop: 15 },
            styles.bg_success,
            styles.buttonSM,
            styles.flexRow,
            styles.centerItems,
          ]}
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
