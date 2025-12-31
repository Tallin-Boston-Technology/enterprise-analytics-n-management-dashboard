export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

export const setSessionStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to sessionStorage", error);
  }
};

export const getSessionStorage = <T>(key: string): T | null => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error reading from sessionStorage", error);
    return null;
  }
};

export const removeSessionStorage = (key: string): void => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from sessionStorage:", error);
  }
};

export const clearSessionStorage = (): void => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
};

export const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const isSessionStorageAvailable = (): boolean => {
  try {
    const testKey = "__test__";
    sessionStorage.setItem(testKey, "test");
    sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

export const getLocalStorageKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
};

export const getSessionStorageKeys = (): string[] => {
  try {
    return Object.keys(sessionStorage);
  } catch (error) {
    console.error("Error getting sessionStorage keys:", error);
    return [];
  }
};

export const getLocalStorageSize = (): number => {
  try {
    let total = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error("Error calculating localStorage size: ", error);
    return 0;
  }
};

export const getSessionStorageSize = (): number => {
  try {
    let total = 0;
    for (const key in sessionStorage) {
      if (Object.prototype.hasOwnProperty.call(sessionStorage, key)) {
        total += sessionStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error("Error calculating sessionStorage size: ", error);
    return 0;
  }
};
