import type { FlockResponse, Schedule, VaccinationRecord } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
export default function useHome() {
  const router = useRouter();
  const [isAFlockMVisible, setIsAFlockMVisible] = useState(false);
  const [isScheduleMVisible, setIsScheduleMVisible] = useState(false);
  const [isVaccinationVisible, setIsVaccinationVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Vaccinations");
  const [flocks, setFlocks] = useState<FlockResponse[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([])

  const openAddFlockModal = () => setIsAFlockMVisible(true);
  const closeAddFlockModal = () => setIsAFlockMVisible(false);

  const openAddScheduleModal = () => setIsScheduleMVisible(true);
  const closeAddScheduleModal = () => setIsScheduleMVisible(false);

  const openAddVaccinationModal = () => setIsVaccinationVisible(true);
  const closeAddVaccinationModal = () => setIsVaccinationVisible(false)

  const deleteFlock = (id: string) =>{
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks?id=${id}`, {method:  "DELETE"})
    .then(response => response.json())
    .then(response=>{
      if (response?.success){
        setFlocks(prevFlocks => prevFlocks.filter(flock => flock._id !== id))
      }
    })
  }

  const addScheduleSuccessCallBack = (schedule :any)=>{
    closeAddScheduleModal()
    setSchedules((p)=>[...p, schedule])
  }
  return {
    currentTab,
    isAFlockMVisible,
    isScheduleMVisible,
    router,
    flocks,
    schedules,
    vaccinations,
    isVaccinationVisible, 
    addScheduleSuccessCallBack,
    setSchedules,
    deleteFlock,
    setFlocks,
    setVaccinations,
    closeAddScheduleModal,
    setCurrentTab,
    openAddFlockModal,
    closeAddFlockModal,
    openAddScheduleModal,
    openAddVaccinationModal,
    closeAddVaccinationModal
  };
}
