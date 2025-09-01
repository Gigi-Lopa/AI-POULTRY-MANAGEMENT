import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fdfdfdff",
    width: width,
    height: height,
    position: "relative",
  },
  container: {
    padding: 25,
    position: "relative",
  },
  bg_success: {
    backgroundColor: "#16a34a", // green-600
  },
  bg_danger: {
    backgroundColor: "#dc2626", // red-600
  },
  bg_purple: {
    backgroundColor: "#7e22ce", // purple-700
  },
  bg_amber: {
    backgroundColor: "#f59e0b", // amber-500
  },
  bg_blue: {
    backgroundColor: "#2563eb", // blue-600
  },
  bg_white: {
    backgroundColor: "#ffffff",
  },
  bg_success_30: { backgroundColor: "rgba(22, 163, 74, 0.3)" },
  bg_danger_30: { backgroundColor: "rgba(220, 38, 38, 0.3)" },
  bg_purple_30: { backgroundColor: "rgba(126, 34, 206, 0.3)" },
  bg_amber_30: { backgroundColor: "rgba(245, 158, 11, 0.3)" },
  bg_blue_30: { backgroundColor: "rgba(37, 99, 235, 0.3)" },
  text_success: { color: "#16a34a" },
  text_danger: { color: "#dc2626" },
  text_purple: { color: "#7e22ce" },
  text_amber: { color: "#f59e0b" },
  text_blue: { color: "#2563eb" },
  text_white: { color: "#ffffff" },
  h1: {
    fontSize: 29,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#222",
  },
  h2: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: "#222",
  },
  h3: {
    fontSize: 21,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  h4: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: "#333",
  },
  h5: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#444",
  },
  h6: {
    fontSize: 13,
    fontWeight: "500",
    fontFamily: "Poppins-Medium",
    color: "#444",
  },
  p: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#555",
  },
  fontBold: {
    fontFamily: "Poppins-Bold",
  },
  fontSemiBold :{
    fontFamily: "Poppins-SemiBold",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
  },
  buttonSM: {

    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
  },
  normalButtonSM: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  btnText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: "#16a34a",
    borderWidth: 2,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    fontSize: 12,
  },
  buttonTextOutline: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    fontSize: 12,
  },
  textCenter: {
    textAlign: "center",
  },
  centerItems: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
  },
  flexWrap: {
    flexWrap : "wrap"
  },
  flexColumn: {
    flexDirection: "column",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  h10: { height: height * (10 / 100) },
  h20: { height: height * (20 / 100) },
  h30: { height: height * (30 / 100) },
  h40: { height: height * (40 / 100) },
  h50: { height: height * (50 / 100) },
  h60: { height: height * (60 / 100) },
  h70: { height: height * (70 / 100) },
  h80: { height: height * (80 / 100) },
  h90: { height: height * (90 / 100) },
  h100: { height: "100%" },
  w5: { width: width * 0.05 },
  w10: { width: width * 0.1 },
  w15: { width: width * 0.15 },
  w20: { width: width * 0.2 },
  w25: { width: width * 0.25 },
  w30: { width: width * 0.3 },
  w35: { width: width * 0.35 },
  w40: { width: width * 0.4 },
  w45: { width: width * 0.45 },
  w50: { width: width * 0.5 },
  w55: { width: width * 0.55 },
  w60: { width: width * 0.6 },
  w65: { width: width * 0.65 },
  w70: { width: width * 0.7 },
  w75: { width: width * 0.75 },
  w80: { width: width * 0.8 },
  w85: { width: width * 0.85 },
  w90: { width: width * 0.9 },
  w95: { width: width * 0.95 },
  w100: { width: "100%" },

  iconContainer: {
    borderRadius: "50%",
    alignSelf: "center",
    padding: 25,
    marginBottom: 15,
  },
  formGroup: {},
  defaultInput: {
    borderColor: "#16a34a",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 10,
    fontFamily: "Poppins-Regular",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  selfCenter: {
    alignSelf: "center",
  },
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 25,
    backgroundColor: "white",
    position: "fixed",
  },

  androidShadow: {
    elevation: 5,
  },
  iosShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dashboardCards: {},
  dashboardCard: {
    backgroundColor: "white",
    borderRadius: 7.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5dc",
  },
  linearGradient: {
    width: "100%",
    borderRadius: 7.5,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  mTop: {
    marginTop: 25,
  },

  activeTab: {
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#16a34a",
  },
  tabText: {
    color: "#555",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#16a34a",
  },
  rounded: {
    borderRadius: 7.5,
  },
  poultryCard: {
    borderColor: "#d1d5dc",
    borderWidth: 0.8,
    padding: 15,
    marginBottom: 15,
  },
  flockCardText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  pill: {
    paddingInline: 15,
    paddingVertical: 2.5,
    borderRadius: 50,
    textAlign: "center",
  },
  pillText: {
    fontFamily: "Poppins-Regulara",
    margin: 0,
    color: "#ffffff",
    fontSize: 10,
  },
  borderBottom: {
    borderWidth: 0,
    borderBottomColor: "#d1d5dc",
    borderBottomWidth: 1,
  },
  positionRelative: {
    position: "relative",
  },
  modal: {
    flex: 1,
    width,
    height,
    position: "absolute",
    backgroundColor: "#00000086",
    zIndex: 100,
    padding: 25,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 7.5,
    padding: 15,
  },
  modalHeader: {
    width: "100%",
    position: "relative",
  },
  inputSearchResults: {
    position: "absolute",
    zIndex: 150,
    width: "100%",
    padding: 10,
    top: 65,
    backgroundColor: "white",
    borderRadius: 7.5,
  },
  inputSearchResult: {
    paddingBottom: 5,
  },
  checkBox: {
    width: "45%",
    marginBottom: 15,
    flexDirection: "row",
  },
  prompt : {
    padding : 10,
    borderWidth : 1,
    borderColor : "#d1d5dc",
    borderRadius : 7.5
  }
});



export default styles;
