/* import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "user_id";

export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error getting user_id", error);
    return null;
  }
};

export const clearUserId = async () => {
  try {
    await AsyncStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error("Error clearing user_id", error);
  }
};
export const USER_ID = await getUserId() || "";  */
export const USER_ID = "";
