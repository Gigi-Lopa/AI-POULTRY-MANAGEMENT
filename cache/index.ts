import * as FileSystem from "expo-file-system";

const CACHE_DIR = FileSystem.documentDirectory + "cache/";

const ensureCacheDir = async () => {
  const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
  }
};

export const saveToCache = async (key: string, data: object) => {
  try {
    await ensureCacheDir();
    const fileUri = CACHE_DIR + key + ".json";
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
};

export const loadFromCache = async <T = any>(key: string): Promise<T | null> => {
  try {
    const fileUri = CACHE_DIR + key + ".json";
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) return null;

    const raw = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error("Error loading from cache:", error);
    return null;
  }
};


export const updateCache = async (
  key: string,
  newData:any,
  type: "data" | "syncData"
) => {
  try {
    await ensureCacheDir();
    const fileUri = CACHE_DIR + key + ".json";

    let existingData: any = { results: [] };
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const raw = await FileSystem.readAsStringAsync(fileUri);
      existingData = JSON.parse(raw);
    }
    const updatedData =
    type === "syncData"
      ? Object.entries(newData).reduce((acc, [key, value]) => {
          if (Array.isArray(value) && Array.isArray(acc[key])) {
            acc[key] = [...acc[key], ...value];
          } else {
            acc[key] = value;
          }
          return acc;
        }, { ...existingData })
      : {
          ...existingData,
          results: [...(existingData.results || []), ...(newData || [])],
        };

   
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedData));
    return updatedData;
  } catch (error) {
    console.error("Error updating cache:", error);
    return null;
  }
};


export const clearCache = async (key: string) => {
  try {
    const fileUri = CACHE_DIR + key + ".json";
    await FileSystem.deleteAsync(fileUri, { idempotent: true });
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
};

export const clearAllCache = async () => {
  try {
    await FileSystem.deleteAsync(CACHE_DIR, { idempotent: true });
    await ensureCacheDir();
  } catch (error) {
    console.error("Error clearing all cache:", error);
  }
};
