import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

const useSessionStorage = <S>(
  key: string,
  initialValue: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: any) => {
    if (value instanceof Function) {
      setStoredValue((prevValue: any) => {
        const newValue = value(prevValue);
        sessionStorage.setItem(key, JSON.stringify(newValue));
        return newValue;
      });
    } else {
      setStoredValue(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  };
  return [storedValue, setValue];
};

export default useSessionStorage;
