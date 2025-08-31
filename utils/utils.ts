import { Schedule } from "@/types";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const dayMap: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export function extractTime(isoString: string) {
  const date = new Date(isoString);
  return date.toISOString().substring(11, 16); 

}

export function extractDays(days: string){
  return days
      .split(" ")
      .filter(Boolean)
      .map(day => `${day[0].toUpperCase()}${day[1]}${day[2]}`)
      .join(", ");
}

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permission for notifications not granted");
      return;
    }
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export async function scheduleFeedingReminder(schedule: Schedule) {
  if (!schedule.notify) return;

  const date = new Date(schedule.time);
  const [hour, minute] = [date.getHours(), date.getMinutes()];

  const days = schedule.repeat.split(" ").map((d: string) => d.toLowerCase());

  for (const d of days) {
    if (dayMap[d] !== undefined) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Feeding Reminder 🐔",
          body: `${schedule.flockName} - ${schedule.feed} (${schedule.amount})`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
          weekday: dayMap[d] + 1,
          hour,
          minute,
        },
      });
    }
  }
}
