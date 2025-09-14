import { clearCache, loadFromCache, saveToCache, updateCache } from "@/cache";
import { NetworkStatusContext } from "@/context/NetworkStatusProvider";
import type { AIRecommendation, FlockResponse, Schedule, VaccinationRecord } from "@/types";
import { submitData } from "@/utils/submitHandlers";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
export default function useHome() {
  const router = useRouter();
  const {isOffline} = useContext(NetworkStatusContext)
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
    error : ""
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
    .then(async(response) => {
        if(response.success){
          await clearCache("counts");
          await saveToCache("counts", response);

          setDashboardCounts({
            flocks: response.counts.flocksCount,
            birds : response.counts.birdCounts
          })
        }
    })
    .catch(async(error) => {
      const response = await loadFromCache("counts")
      setDashboardCounts({
        flocks: response.counts.flocksCount,
        birds : response.counts.birdCounts
      })
      console.error(error)
    })
  }

  const getAIRecommendations = () =>{
    setDashboardAIStatus((p)=>({...p, loading: true}))
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/ai?id=${USER_ID}`)
    .then(response => response.json())
    .then(async(response) => {
      if(response.success){
        await clearCache("recommendations")
        await saveToCache("recommendations", response)
        setAI_RECOMMENDATIONS(response.AI_RECOMMENDATIONS); 
      }
    })
    .catch(async (error) =>{
      const response = await loadFromCache("recommendations")
      setAI_RECOMMENDATIONS(response.AI_RECOMMENDATIONS); 
      console.error(error)
    })
    .finally(()=> setDashboardAIStatus((p)=>({...p, loading: false})))
  }

  const getFlocks = async () => {
    setStatus((p)=> ({...p, loading: true}));
    try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/flocks?id=${USER_ID}`);
        const data = await res.json();

    if (data?.success) {
      await clearCache("flocks")
      await saveToCache("flocks", {
        results: data.results
      })
      setFlocks(data.results);

    } else {
      setStatus((p)=> ({...p, error: data?.message  ?? "Something wen't wrong"}));
    }
    } catch (err) {
      
      const data = await loadFromCache("flocks");
      if(data) setFlocks(data.results);
      
      console.error(err);

    } finally {
      setStatus((p)=> ({loading : false, error: ""}));
    }
  }

  useEffect(() => {
    const getToken = async () => {
    
      const token = await loadFromCache("token");
      if (token) {
        setUSER_ID(token.userID);
      }
    };
     const sync = async () => {
      const DATA = await loadFromCache("updates");
      if (!DATA?.flocks?.length) return;

      const onSuccess = (response:any) => {
        ToastAndroid.show("Flocks synchronization successful", ToastAndroid.SHORT);
        setFlocks((prevFlocks) => [
          ...prevFlocks,
          ...response.results.filter(
              (nf: any) => !prevFlocks.some((pf) => pf._id === nf._id) 
          ),
        ]);
        updateCache("updates", { flocks: [] }, "syncData");
      };

      submitData(DATA.flocks, "/api/flocks", "POST", onSuccess);
    };

    sync();
    getToken();
  }, []);

  useEffect(() => {
    if (!USER_ID) return;
    getFlocks();
  }, [USER_ID]);

  useEffect(() => {
    if (!USER_ID) return;

    getDashboardData();
    //setTimeout(() => getAIRecommendations(), 2500);
  }, [USER_ID, flocks]);


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
