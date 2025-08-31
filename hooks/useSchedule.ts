import { USER_ID } from "@/constants";
import { NotifyDay, Schedule, ScheduleFormData } from "@/types";
import { scheduleFeedingReminder } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Alert, NativeSyntheticEvent, TextInputChangeEventData, ToastAndroid } from "react-native";

export default function useSchedule(
 onUpdate? : (value:any)=>void,
 schedules?: Schedule[],
 setSchedules? :(values :Schedule[]) => void){
 
  const [isNotify, setIsNotify] = useState(false);
  const [status, setStatus] = useState({
    loading : false,
    error : false,
    success : false
    })
  const [validateForm, setValidationForm] = useState({
    isFlockSelected: false,
    isFeed: false,
    isAmount: false,
    isRepeat: false,
    isTime: false,
    isNotifyDays: false, 
    })
  const [feedStatus, setFeedStatus] = useState({
    loading : false,
    error : false
  })
  const toggleNotify = () => setIsNotify((prev) => !prev);
  const [notifyDays, setNotifyDays] = useState<NotifyDay>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });
  const [scheduleForm, setScheduleForm] = useState<ScheduleFormData>({
    flock_id: "",
    user_id: "",
    feed: "",
    amount: "",
    time: new Date(),
    repeat: notifyDays,
    notify: isNotify,
  });

  useEffect(() => {
    setScheduleForm((prev) => ({
      ...prev,
      notify: isNotify,
      repeat: notifyDays,
    }));
  }, [isNotify, notifyDays]);

  const handleChange = (
    field: keyof ScheduleFormData,
    value: NativeSyntheticEvent<TextInputChangeEventData> | boolean | Date | string
  ) => {
    let processedValue = value;
    
    if (value && typeof value === 'object' && 'nativeEvent' in value) {
      processedValue = (value as NativeSyntheticEvent<TextInputChangeEventData>).nativeEvent.text;
    }
    
    setScheduleForm((prev) => ({
      ...prev,
      [field]: processedValue,
    }));
  };
  const hasAtLeastOneDay = (days: NotifyDay): boolean => {
    return Object.values(days).some(day => day === true);
  };
  const returnSelectedDays = () =>{
    let selectedDays = ""
    Object.keys(scheduleForm.repeat).map(key =>{
      if(scheduleForm.repeat[key as keyof typeof scheduleForm.repeat] === true){
        selectedDays = selectedDays + " " + key;
      }
    })

    return selectedDays.trim();
  }
  const validate = () => {
    const { feed, amount, flock_id, time } = scheduleForm;
    const atLeastOneDaySelected = !isNotify || hasAtLeastOneDay(notifyDays);
    const updatedValidation = {
      isFlockSelected: !Boolean(flock_id?.toString().trim().length), 
      isAmount: !Boolean(amount?.toString().trim().length),
      isFeed: !Boolean(feed?.toString().trim().length),
      isRepeat: false,
      isNotifyDays: !atLeastOneDaySelected, 
    };

    setValidationForm((prev) => ({
      ...prev,
      ...updatedValidation,
    }));
    
    const hasErrors = Object.values(updatedValidation).some(error => error === true);
    if (hasErrors) return false;

    submitForm(scheduleForm);
    return true;
  };
  const clearValidationErrors = () => {
    setValidationForm({
      isFlockSelected: false,
      isFeed: false,
      isAmount: false,
      isRepeat: false,
      isTime: false,
      isNotifyDays: false,
    });
  };
  const deleteSchedule = (id: string) =>{
      fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/feeding?id=${id}`, 
        {
          method : "DELETE",
          headers : {
            "Content-Type" : "application/json"
          }
        }
      )
      .then(response => response.json())
      .then(response =>{
        if (response.success) {
          if (setSchedules && schedules) {
            setSchedules(schedules.filter(schedule => schedule._id !== id));
          }
        }
      })
      .catch(error=>{
        console.error(error)
        Alert.alert("An error occurred deleting schedule");
      })
  }
  const updateNotification = (id: string, state: Boolean)=>{
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/feeding`, 
        {
          method : "PATCH",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            schedule_id : id, 
            notify : state
          })
        }
      )
      .catch(error =>{
        console.error(error)
        ToastAndroid.show("Error updating schedule", ToastAndroid.SHORT)
      })
  }
  const fetchSchedules = () =>{
    setFeedStatus((p)=> ({...p, loading: true}))
    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/feeding?id=${USER_ID}`)
    .then(response => response.json())
    .then(response =>{
      if (response.success) {
        if(setSchedules)setSchedules(response.schedules ?? [])
          response.schedules.map((s: Schedule)=>{
            if (s.notify)scheduleFeedingReminder(s);  
        })
      }
    })
    .catch(error=>{
      console.error(error)
      Alert.alert("An error occurred")
    })
    .finally(()=> setFeedStatus((p)=> ({...p, loading: false})))
  }

  const submitForm = (finalData: ScheduleFormData) => {
    setStatus((p)=> ({...p , loading: true}))
    clearValidationErrors()

    fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/feeding`, {
      method : "PUT",
      headers : {
        "Content-Type" : "application/json"
      },
      body :JSON.stringify({
        "scheduleOwner": USER_ID,
        "flockID": finalData.flock_id,
        "feed" : finalData.feed,
        "amount" : finalData.amount,
        "time": finalData.time,
        "repeat": returnSelectedDays(),
        "notify": finalData.notify,
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.success){
        setTimeout(()=>{if (onUpdate) onUpdate(response.schedule);}, 1500)
        setStatus((p)=> ({...p , success: true}))
        return;
      }
      setStatus((p)=> ({...p , error: true}))
    })
    .catch(error =>{
      console.log(error)
      setStatus((p)=> ({...p , error: true}))
    }) 
    .finally(()=>{
      setStatus(()=> ({loading : false , error: false,success : false}))
    })

  };

  return {
    scheduleForm,
    notifyDays,
    isNotify,
    validateForm,
    status, 
    feedStatus,
    updateNotification,
    deleteSchedule,
    fetchSchedules,
    toggleNotify,
    validate,
    handleChange,
    setNotifyDays,
    hasAtLeastOneDay,
  }
}