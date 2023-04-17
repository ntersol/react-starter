import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface UiGlobalState {
  name?: string | null;
  update: (state: Partial<UiGlobalState>) => void;
  reset: () => void;
}

const uiStateInitial: UiGlobalState = {
  name: '',
  update: () => {},
  reset: () => {},
};

const UiGlobalContext = createContext(uiStateInitial);
const localStorageKey = 'uiGlobalState';

/** Global UI State Context */
export const useUiGlobal = useContext(UiGlobalContext);

/** Global UI State Provider */
export const UiGlobalProvider = ({ children }: { children?: ReactNode | null }) => {
  // Global UI State defaults
  const [uiState, setUiState] = useState<UiGlobalState>(() => {
    // Check localStorage for any saved state first
    const savedState = localStorage.getItem(localStorageKey);
    return savedState ? JSON.parse(savedState) : uiStateInitial;
  });

  // On Changes to uiState, update localstorage
  useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(uiState));
  }, [uiState]);

  /** Change global UI state. Accepts a partial of the UI state object */
  const update = (state: Partial<UiGlobalState>) => setUiState(stateSrc => ({ ...stateSrc, ...state }));
  /** Reset state */
  const reset = () => setUiState(uiStateInitial);

  return <UiGlobalContext.Provider value={{ name: uiState.name, update, reset }}>{children}</UiGlobalContext.Provider>;
};
