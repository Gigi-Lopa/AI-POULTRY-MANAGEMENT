import { loadFromCache } from "@/cache";
import type { AIRecommendation, FlockResponse, Schedule, VaccinationRecord } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
export default function useHome() {
  const router = useRouter();
  const [dashboardCounts, setDashboardCounts] = useState({
    flocks :0,
    birds : 0
  })
  const [dashboardAIStatus, setDashboardAIStatus] = useState({
    loading: true
  });
  const [USER_ID, setUSER_ID] = useState(null);
  const [isAFlockMVisible, setIsAFlockMVisible] = useState(false);
  const [isScheduleMVisible, setIsScheduleMVisible] = useState(false);
  const [isVaccinationVisible, setIsVaccinationVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Overview");
  const [flocks, setFlocks] = useState<FlockResponse[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([])
  const [AI_RECOMMENDATIONS, setAI_RECOMMENDATIONS] = useState<AIRecommendation[]>([])
  const [status, setStatus] = useState({
    loading : false,
    error : false
  })
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

  const getDashboardData = () => {
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/dashboard?id=${USER_ID}`)
    .then(response => response.json())
    .then(response => {
        if(response.success){
          setDashboardCounts({
            flocks: response.counts.flocksCount,
            birds : response.counts.birdCounts
          })
        }
    })
    .catch(error => {
      console.error(error)
    })
  }

  const getAIRecommendations = () =>{
    setDashboardAIStatus((p)=>({...p, loading: true}))
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/ai?id=${USER_ID}`)
    .then(response => response.json())
    .then(response => {
      if(response.success){
        setAI_RECOMMENDATIONS(response.AI_RECOMMENDATIONS); 
      }
    })
    .catch(error => console.error(error))
    .finally(()=> setDashboardAIStatus((p)=>({...p, loading: false})))
  }
  const getFlocks = async () => {
    setStatus((p)=> ({...p, loading: true}));
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks?id=${USER_ID}`);
        const data = await res.json();

    if (data?.success) {
        setFlocks(data.flocks);
    } else {
      setStatus((p)=> ({...p, error: true}));
    }
    } catch (err) {
      console.error(err);
      setStatus((p)=> ({...p, error: true}));
    } finally {
      setStatus((p)=> ({loading : false, error: false}));
    }
  }

  useEffect(()=>{
    const getToken = async () => {
      const token = await loadFromCache("token")
      setUSER_ID(token.userID)
    }
    getToken()
  }, [])

  useEffect(()=>{
    if (!USER_ID) return;
    getDashboardData()
    setTimeout(()=>{getAIRecommendations()},2500)
  }, [USER_ID,flocks])

  useEffect(()=>{getFlocks()}, [USER_ID])

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
    dashboardCounts,
    dashboardAIStatus,
    AI_RECOMMENDATIONS,
    status,
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
