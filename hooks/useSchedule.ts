import { USER_ID } from "@/constants";
import { NotifyDay, ScheduleFormData } from "@/types";
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function useSchedule(onUpdate : (value:any)=>void){
    const [isNotify, setIsNotify] = useState(false);
    const [status, setStatus] = useState({
      loading : false,
      error : false
    })
    const [validateForm, setValidationForm] = useState({
      isFlockSelected: false,
      isFeed: false,
      isAmount: false,
      isRepeat: false,
      isTime: false,
      isNotifyDays: false, 
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

    const isValidTime = (time: Date | null | undefined ) => {
      const now = new Date();
      const selectedTime = new Date( time ? time : '');
      
      if (selectedTime.toDateString() === now.toDateString()) {
        return selectedTime.getTime() > now.getTime();
      }
      
    };

    const validate = () => {
      const { feed, amount, flock_id, time } = scheduleForm;
      const atLeastOneDaySelected = !isNotify || hasAtLeastOneDay(notifyDays);
      const updatedValidation = {
        isFlockSelected: !Boolean(flock_id?.toString().trim().length), 
        isAmount: !Boolean(amount?.toString().trim().length),
        isFeed: !Boolean(feed?.toString().trim().length),
        isTime: !isValidTime(time),
        isRepeat: false,
        isNotifyDays: !atLeastOneDaySelected, 
      };

      setValidationForm((prev) => ({
        ...prev,
        ...updatedValidation,
      }));

      const hasErrors = Object.values(updatedValidation).some(error => error === true);
      
      if (hasErrors) {
        return false;
      }
     
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
    const submitForm = (finalData: ScheduleFormData) => {
      console.log("Submitting final data:", finalData);
      clearValidationErrors()
      setStatus((p)=> ({...p, loading : true}))
      
      fetch(`${process.env.EXPO_PUBLIC_IP_ADDRESS}/api/feeding`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body :JSON.stringify({
          "scheduleOwner": USER_ID,
          "flockID": scheduleForm.flock_id,
          "feed" : scheduleForm.feed,
          "amount" : scheduleForm.amount,
          "time": scheduleForm.time,
          "repeat": scheduleForm.repeat,
          "notify": scheduleForm.notify,
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response.success){
          onUpdate(response.schedule);
        }
      })
      .catch(error =>{
        console.log(error)
      })

    };

  

    return {
      scheduleForm,
      notifyDays,
      isNotify,
      validateForm,
      status, 
      toggleNotify,
      validate,
      handleChange,
      setNotifyDays,
      hasAtLeastOneDay,
      isValidTime,
    }
}