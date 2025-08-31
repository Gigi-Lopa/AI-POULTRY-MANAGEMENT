import type { VaccinationFormData, VaccinationRecord } from "@/types/index";
import { useState } from "react";

interface Props {
  closeModal: () => void;
  setVaccinations: React.Dispatch<React.SetStateAction<VaccinationRecord[]>>;
}

export default function useAddVaccination({ closeModal, setVaccinations}: Props) {
  const [formData, setFormData] = useState<VaccinationFormData>({
    flockID: "",
    flockName: "",
    vaccineName: "",
    vaccineType: "",
    manufacturer: "",
    dosage: "",
    route: "",
  });

  const [validationForm, setValidationForm] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleChange = (field: keyof FormData, value: string) => {
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

    if (!formData.flockID) errors.flockID = true;
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

    const flockName = formData.flockID; 
    const newRecord: VaccinationRecord = {
      ...formData,
      flockName
    };

    setVaccinations(prev => [...prev, newRecord]);
    setStatus({ loading: false, error: false });
    closeModal();
  };

  return {
    formData,
    validationForm,
    status,
    handleChange,
    updateVaccineType,
    updateRoute,
    validate,
  };
}
