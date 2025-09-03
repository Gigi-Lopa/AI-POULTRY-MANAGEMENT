import { loadFromCache } from "@/cache";
import { FlockFormData, FlockFormDataValidation, FlockResponse } from "@/types";
import { useEffect, useState } from "react";

interface props{
  closeModal: () => void;
  setFlocks : React.Dispatch<React.SetStateAction<FlockResponse[]>>;
}

export default function useAddFlock({closeModal, setFlocks}: props){
    const [breedType, setBreedType] = useState<string>();
    const [breadPurpose, setBreedPurpose] = useState<string>();
    const [USER_ID, setUSER_ID] = useState(null);
    const [status, setStatus] = useState({
        error : false,
        loading: false
    })

    useEffect(()=>{
        const getToken = async () => {
        const token = await loadFromCache("token")
        setUSER_ID(token.userID)
        }
        getToken()
    }, [])

    const updateBreedPurpose = (item: string): void => {
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

    const handleChange = (field: keyof FlockFormData, value: string) => {
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
                [key]: true,
            }))
        } else {
            setValidationForm((prev) => ({
                ...prev,
                [key]: false,
            }));
        }
        });

        if (isValid) {
        setStatus((prev)=> ({...prev, loading : true}))
        fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                flockOwner: USER_ID, // remove after login is working
                flockName: formData.flockName,
                breedType: breedType,
                numberOfBirds: formData.numberOfBirds,
                age: formData.age,
                locationCoop: formData.locationCoop,
                flockPurpose: breadPurpose,
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            if (response?.success) {
                setFlocks((prevFlocks) => [...prevFlocks, response.flock]);
                closeModal();
            }
        })
        .catch((error) => {
            console.error("Error add flock:" + error);
            setStatus(p => ({...p, error: true}))
        })
        .finally(()=>
            setTimeout(()=>{
                setStatus({error: false, loading : false})
            }, 3500)
        )}
    };

    return {
        validationForm,
        formData,
        breedType,
        breadPurpose,
        status,
        validate,
        updateBreedPurpose,
        updateBreedType,
        handleChange,
    }
}