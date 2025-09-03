import FeedingScheduleContent from "@/components/ContentFiles/FeedingScheduleContent";
import OverviewContent from "@/components/ContentFiles/OverviewContent";
import SymptomAnalysisContent from "@/components/ContentFiles/SymptomAnalysisContent";
import VaccinationContent from "@/components/ContentFiles/VaccinationContent";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import TopTabs from "@/components/TopTabs";
import AddFlockForm from "@/forms/addFlockForm";
import AddScheduleForm from "@/forms/addScheduleForm";
import AddVaccinationForm from "@/forms/addVaccinationForm";
import useHome from "@/hooks/useHome";
import useSymptomAnalysis from "@/hooks/useSymptomAnalysis";
import styles from "@/styles/main";
import { registerForPushNotificationsAsync } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Bird, House, TrendingUp } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";


export default function Index() {
  const {
    currentTab,
    isAFlockMVisible,
    isScheduleMVisible,
    schedules,
    flocks,
    vaccinations,
    isVaccinationVisible,
    dashboardCounts,
    dashboardAIStatus,
    status,
    AI_RECOMMENDATIONS,
    setVaccinations,
    setSchedules,
    addScheduleSuccessCallBack,
    setFlocks,
    closeAddScheduleModal,
    setCurrentTab,
    openAddFlockModal,
    deleteFlock,
    closeAddFlockModal,
    openAddScheduleModal,
    openAddVaccinationModal,
    closeAddVaccinationModal
  } = useHome();
  const {
    prompt, 
    suggestions,
    loading,
    setPrompt,
    getSuggestion
  } = useSymptomAnalysis()

  useEffect(()=>{registerForPushNotificationsAsync()}, [])

  return (
    <View style={[styles.screen, styles.positionRelative]}>
      {isAFlockMVisible && (
        <Modal headerTitle="Add Flock" closeModal={closeAddFlockModal}>
          <AddFlockForm closeModal = {closeAddFlockModal} setFlocks = {setFlocks}/>
        </Modal>
      )}

      {isScheduleMVisible && (
        <Modal closeModal={closeAddScheduleModal} headerTitle="Add a schedule">
          <AddScheduleForm onUpdate = {addScheduleSuccessCallBack}/>
        </Modal>
      )}

      {
        isVaccinationVisible  &&
        <Modal closeModal={closeAddVaccinationModal} headerTitle="Add a vaccination">
          <AddVaccinationForm closeModal={closeAddVaccinationModal} setVaccinations={setVaccinations}/>
        </Modal>
      }

      <StatusBar style="dark" />
      <Header />
      <ScrollView>
        <View style={[styles.container]}>
          <View
            style={[
              styles.w100,
              styles.flexRow,
              styles.justifyBetween,
              styles.dashboardCards,
            ]}
          >
            <DashboardCard name="NUMBER " value={dashboardCounts.birds} Icon={Bird} />
            <DashboardCard name="FLOCKS" value= {dashboardCounts.flocks} Icon={House} />
          </View>
          <View style={[styles.w100, styles.mTop]}>
            <LinearGradient
              colors={["#ae54ef", "#e7499f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 7.5 }}
            >
              <View style={[styles.linearGradient, styles.flexRow]}>
                <View style={styles.selfCenter}>
                  <TrendingUp size={25} color={styles.text_white.color} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text
                    style={[styles.h5, styles.text_white, { marginBottom: 5 }]}
                  >
                    AI Recommendation
                  </Text>
                  <Text style={[styles.p, styles.text_white]}>
                    Increase protein feed by 15% for better egg production
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.mTop}>
            <TopTabs
              tabs={["Overview", "Feeding", "Vaccinations", "Symptom Analysis"]}
              onTabChange={(tab) => setCurrentTab(tab)}
            />
            <View style={{ marginTop: 16 }}>
              {currentTab === "Overview" && (
                <OverviewContent 
                  deleteFlock = {deleteFlock}
                  flocks={flocks}
                  status={status}
                  AI_RECOMMENDATIONS={AI_RECOMMENDATIONS}
                  AILoadingStatus={dashboardAIStatus}
                  openModal={openAddFlockModal}
                    
                /> )}
              {currentTab === "Feeding" && (
                <FeedingScheduleContent openModal={openAddScheduleModal} schedules = {schedules} setSchedules = {setSchedules}/>
              )}
              {currentTab === "Vaccinations" && <VaccinationContent openModal = { openAddVaccinationModal} closeModal={closeAddVaccinationModal} vaccinations = {vaccinations} setVaccinations = {setVaccinations}/>}
              {currentTab === "Symptom Analysis" && <SymptomAnalysisContent 
                prompt = {prompt}    
                suggestions = {suggestions}
                loading= {loading}
                setPrompt= {setPrompt}
                getSuggestion = {getSuggestion}
              />}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
