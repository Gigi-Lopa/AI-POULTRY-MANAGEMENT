import { USER_ID } from "@/constants";
import type { VaccinationFormData, VaccinationRecord } from "@/types/index";
import { useState } from "react";
import { Alert, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface Props {
  closeModal?: () => void;
  setVaccinations?: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
}

export default function useAddVaccination({ closeModal, setVaccinations}: Props) {
  const [formData, setFormData] = useState<VaccinationFormData>({
    flock_id: "",
    flockName: "",
    vaccineName: "",
    vaccineType: "",
    manufacturer: "",
    dosage: "",
    route: "",
  });

  const [validationForm, setValidationForm] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleChange = (field: any, value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationForm(prev => ({ ...prev, [field]: false }));
  };


  const updateVaccineType = (vaccineType: string) => {
    setFormData(prev => ({ ...prev, vaccineType }));
    setValidationForm(prev => ({ ...prev, vaccineType: false }));
  };

  const updateRoute = (route: string) => {
    setFormData(prev => ({ ...prev, route }));
    setValidationForm(prev => ({ ...prev, route: false }));
  };

  const validate = () => {
    const errors: Record<string, boolean> = {};

    if (!formData.flock_id) errors.flock_id = true;
    if (!formData.vaccineName) errors.vaccineName = true;
    if (!formData.vaccineType) errors.vaccineType = true;
    if (!formData.manufacturer) errors.manufacturer = true;
    if (!formData.dosage) errors.dosage = true;
    if (!formData.route) errors.route = true;

    if (Object.keys(errors).length > 0) {
      setValidationForm(errors);
      return;
    }

    setStatus({ loading: true, error: false });
    submitVaccination(formData)
  };

  function getVaccinations (){
        setStatus({ loading: true, error: false });
        fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/vaccinations?id=${USER_ID}`)
        .then(response => response.json())
        .then(response => {
          if (response.success){
            if(setVaccinations) setVaccinations(response.vaccinations)
          }
        })
        .catch(error => console.log(error)) 
        .finally(()=> setStatus({ loading: false, error: false }))
  }

  function submitVaccination(finalData: VaccinationFormData){
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/vaccinations`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      }, 
      body : JSON.stringify({
        "flockID" : finalData.flock_id,
        "vaccinationOwner": USER_ID,
        "vaccineName" : finalData.vaccineName,
        "vaccineType" : finalData.vaccineType,
        "manufacturer"  : finalData.manufacturer,
        "dosage" : finalData.dosage,
        "route" : finalData.route,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success){
        const flockName = response.vaccination.flockName; 
        const newRecord: VaccinationRecord = {
          ...formData,
          flockName
        };

        if(setVaccinations) setVaccinations(prev => [...prev, newRecord]);
        if (closeModal) closeModal();
      }
    })
    .catch(error =>{
      console.log(error)
      Alert.prompt("Error", "An error occurred writing vaccination")
    })
    .finally(()=> setStatus({ loading: false, error: false }))
  }

  return {
    formData,
    validationForm,
    status,
    getVaccinations,
    handleChange,
    updateVaccineType,
    updateRoute,
    validate,
  };
}
