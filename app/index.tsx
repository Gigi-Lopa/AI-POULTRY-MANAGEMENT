import FeedingScheduleContent from "@/components/ContentFiles/FeedingScheduleContent";
import HealthRecordsContent from "@/components/ContentFiles/HealthRecordsContent";
import OverviewContent from "@/components/ContentFiles/OverviewContent";
import ReportsContent from "@/components/ContentFiles/ReportsContent";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import TopTabs from "@/components/TopTabs";
import AddFlockForm from "@/forms/addFlockForm";
import AddScheduleForm from "@/forms/addScheduleForm";
import useHome from "@/hooks/useHome";
import styles from "@/styles/main";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Bird, HeartPulse, TrendingUp } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const {
    currentTab,
    isAFlockMVisible,
    isScheduleMVisible,
    schedules,
    flocks,
    setSchedules,
    addScheduleSuccessCallBack,
    setFlocks,
    closeAddScheduleModal,
    setCurrentTab,
    openAddFlockModal,
    deleteFlock,
    closeAddFlockModal,
    openAddScheduleModal,

  } = useHome();

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
            <DashboardCard name="BIRDS" value="556" Icon={Bird} />
            <DashboardCard name="SCORE RATE" value="95%" Icon={HeartPulse} />
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
              tabs={["Overview", "Feeding", "Health", "Reports"]}
              onTabChange={(tab) => setCurrentTab(tab)}
            />
            <View style={{ marginTop: 16 }}>
              {currentTab === "Overview" && (
                <OverviewContent deleteFlock = {deleteFlock} flocks={flocks} setFlocks={setFlocks} openModal={openAddFlockModal} />
              )}
              {currentTab === "Feeding" && (
                <FeedingScheduleContent openModal={openAddScheduleModal} />
              )}
              {currentTab === "Health" && <HealthRecordsContent />}
              {currentTab === "Reports" && <ReportsContent />}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
