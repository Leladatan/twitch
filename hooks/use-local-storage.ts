import {Color} from "@/hooks/use-color";

export type keys = "twitch-color";

export type localStorageType = {
  key: keys,
  value: Color
};

export type useLocalStorageType = {
  getLocalStorage: (key: keys) => string | null,
  setLocalStorage: ({key, value}: localStorageType) => void
};

export const useLocalStorage = (): useLocalStorageType => {
  const getLocalStorage = (key: keys): string | null => {
    return localStorage.getItem(key);
  };

  const setLocalStorage = ({key, value}: localStorageType): void => {
    return localStorage.setItem(key, value);
  };

  return {
    getLocalStorage,
    setLocalStorage
  };
};