import { clearCache, loadFromCache, saveToCache } from "@/cache";
import { NetworkStatusContext } from "@/context/NetworkStatusProvider";
import type { VaccinationFormData, VaccinationRecord } from "@/types/index";
import { useContext, useEffect, useState } from "react";
import { Alert, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

interface Props {
  closeModal?: () => void;
  setVaccinations?: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
}

export default function useAddVaccination({ closeModal, setVaccinations}: Props) {
  const [USER_ID, setUSER_ID] = useState(null)
  const {isOffline} = useContext(NetworkStatusContext)
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

  useEffect(()=>{
    const getToken = async () => {
      const token = await loadFromCache("token")
      setUSER_ID(token.userID)
    }
    getToken()
  }, [])

  const handleChange = (field: any, value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationForm(prev => ({ ...prev, [field]: false }));
  };


  const updateVaccineType = (vaccineType: any) => {
    setFormData(prev => ({ ...prev, vaccineType : vaccineType.value }));
    setValidationForm(prev => ({ ...prev, vaccineType: false }));
  };

  const updateRoute = (route: any) => {
    setFormData(prev => ({ ...prev, route: route.value }));
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
  function deleteVaccination(id: string) {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/vaccinations?id=${id}`, {
      method : "DELETE"
    })
    .then(response => response.json())
    .then((response)=>{
      if(response.success){
      
        if (setVaccinations) {
          setVaccinations(prev => prev.filter(v => v._id !== id));
        }
      }
    })
    .catch(error =>{
     Alert.alert("An error occurred deleting vaccine") 
    })

    
  }
  const getVaccinations = async () => {
    setStatus({ loading: true, error: false });

    try {
      let vaccinations;

      if (isOffline) {
        const data = await loadFromCache("vaccinations");
        vaccinations = data.results
      } else {
        const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/vaccinations?id=${USER_ID}`);
        const response = await res.json();

        if (response.success) {
          vaccinations = response.results
          await clearCache("vaccinations");
          await saveToCache("vaccinations", {
            results : vaccinations
          });
        }
      }

      if (setVaccinations) setVaccinations(vaccinations ?? []);
    } catch (error) {
        console.error(error);
        setStatus({ loading: false, error: true });
        return;
    }

    setStatus({ loading: false, error: false });
    };

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
        const _id = response.vaccination._id
        const newRecord: VaccinationRecord = {
          ...formData,
          flockName,  
          _id,
        };

        if(setVaccinations) setVaccinations(prev => [...prev, newRecord]);
        if (closeModal) closeModal();
      }
    })
    .catch(error =>{
      console.log(error)
      setStatus((p)=> ({ ...p, error: true }));
    })
    .finally(()=> setStatus({ loading: false, error: false }))
  }

  return {
    formData,
    validationForm,
    status,
    USER_ID,
    deleteVaccination,
    getVaccinations,
    handleChange,
    updateVaccineType,
    updateRoute,
    validate,
  };
}
