import type { FlockResponse, Schedule } from "@/types";
import { useRouter } from "expo-router";
import { useState } from "react";
export default function useHome() {
  const router = useRouter();
  const [isAFlockMVisible, setIsAFlockMVisible] = useState(false);
  const [isScheduleMVisible, setIsScheduleMVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Feeding");
  const [flocks, setFlocks] = useState<FlockResponse[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const openAddFlockModal = () => setIsAFlockMVisible(true);
  const closeAddFlockModal = () => setIsAFlockMVisible(false);

  const openAddScheduleModal = () => setIsScheduleMVisible(true);
  const closeAddScheduleModal = () => setIsScheduleMVisible(false);

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
    addScheduleSuccessCallBack,
    setSchedules,
    deleteFlock,
    setFlocks,
    closeAddScheduleModal,
    setCurrentTab,
    openAddFlockModal,
    closeAddFlockModal,
    openAddScheduleModal,
  };
}
