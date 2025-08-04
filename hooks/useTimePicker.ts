import { useState } from "react";
export default function useTimePicker() {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const openPickerDialog = () => setShow(true);
  const onChange = (event: any, selectedTime?: Date) => {
    setShow(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return {
    time,
    show,
    openPickerDialog,
    onChange,
  };
}
