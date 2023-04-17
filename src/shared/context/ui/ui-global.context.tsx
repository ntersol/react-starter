import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UiGlobalState {
  name?: string | null;
  stateChange: (state: Partial<UiGlobalState>) => void;
}

const UiStateInitial: UiGlobalState = {
  name: '',
  stateChange: () => {},
};

const UiGlobalContext = createContext(UiStateInitial);
const localStorageKey = 'uiGlobalState';

/** Global UI State Context */
export const useUiGlobal = () => useContext(UiGlobalContext);

/** Global UI State Provider */
export const UiGlobalProvider = ({ children }: { children?: ReactNode | null }) => {
  const [uiState, setUiState] = useState<UiGlobalState>(() => {
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState) : UiStateInitial;
  });

  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(uiState));
  }, [uiState]);

  const stateChange = (state: Partial<UiGlobalState>) => setUiState(stateSrc => ({ ...stateSrc, ...state }));

  return <UiGlobalContext.Provider value={{ name: uiState.name, stateChange }}>{children}</UiGlobalContext.Provider>;
};
