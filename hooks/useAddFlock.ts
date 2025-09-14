import { loadFromCache, updateCache } from "@/cache";
import { NetworkStatusContext } from "@/context/NetworkStatusProvider";
import { FlockFormData, FlockFormDataValidation, FlockResponse } from "@/types";
import { submitData } from "@/utils/submitHandlers";
import { useContext, useEffect, useState } from "react";

interface props{
  closeModal: () => void;
  setFlocks : React.Dispatch<React.SetStateAction<FlockResponse[]>>;
}

export default function useAddFlock({closeModal, setFlocks}: props){
    const {isOffline} = useContext(NetworkStatusContext);
    const [breedType, setBreedType] = useState<string>();
    const [breadPurpose, setBreedPurpose] = useState<string>();
    const [USER_ID, setUSER_ID] = useState(null);
    const [status, setStatus] = useState({
        error : "",
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
    const validate = async () => {
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
        const DATA: FlockResponse[] =  [
            {   
                _id : "",
                flockOwner: USER_ID ?? "", 
                flockName: formData.flockName,
                breedType: breedType ?? "",
                numberOfBirds: formData.numberOfBirds,
                age: formData.age,
                locationCoop: formData.locationCoop,
                flockPurpose: breadPurpose ?? "",
            }
        ]
        const onSuccess = (response: any) => {
            if (response?.success) {
                const newFlocks = response.results ?? [response.results];
               
               setFlocks((prevFlocks) => [
                ...prevFlocks,
                ...newFlocks.filter(
                    (nf: any) => !prevFlocks.some((pf) => pf._id === nf._id) 
                ),
                ]);

                closeModal();
            }
        };

        const onError = (error : any)=> {  
            console.log(error)
            setStatus(p => ({...p, error: error.message}))
        }

        const onFinal = () =>{
            setTimeout(()=>{
            setStatus({error: "", loading : false})
            }, 3500)
        }
        const normalized = DATA.map((flock:any) => ({
            ...flock,
            _id : new Date().toISOString(),
            breedType: flock.breedType?.label ?? flock.breedType,
            flockPurpose: flock.flockPurpose?.label ?? flock.flockPurpose,
        }));
        
        await updateCache("flocks", normalized, "data")
        await updateCache("updates", {
            flocks :  DATA
        }, "syncData")
        
        if(!isOffline){
            submitData(
                DATA,
                "/api/flocks",
                "POST",
                onSuccess,
                onError,
                onFinal
            )     
        } else {
            onSuccess({
                success : true,
                results :  normalized
            })
        }
       
    }
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