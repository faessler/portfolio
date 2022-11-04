import { useState } from "react";

const useLocalStorage = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: unknown) => {
    if (value instanceof Function) {
      setStoredValue((prevValue: unknown) => {
        const newValue = value(prevValue);
        localStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } else {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
