import { useRouter } from "expo-router";
import { useState } from "react";
export default function useHome() {
  const router = useRouter();
  const [isAFlockMVisible, setIsAFlockMVisible] = useState(false);
  const [isScheduleMVisible, setIsScheduleMVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Feeding");

  const openAddFlockModal = () => setIsAFlockMVisible(true);
  const closeAddFlockModal = () => setIsAFlockMVisible(false);

  const openAddScheduleModal = () => setIsScheduleMVisible(true);
  const closeAddScheduleModal = () => setIsScheduleMVisible(false);

  return {
    currentTab,
    isAFlockMVisible,
    isScheduleMVisible,
    router,
    closeAddScheduleModal,
    setCurrentTab,
    openAddFlockModal,
    closeAddFlockModal,
    openAddScheduleModal,
  };
}
