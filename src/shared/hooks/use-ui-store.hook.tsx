import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { NtsState } from '../context/api/api.models';

/**
 *
 * @param initialState
 * @param options
 * @returns
 */
export const useUiStore = <t extends object>(initialState: t, options?: NtsState.UIStoreOptions) => {
  const Context = createContext(initialState);
  const localStorageKey = 'uiGlobalState';

  /** Global UI State Context */
  const useUiContext = () => useContext(Context);

  /** Global UI State Provider */
  const Provider = ({ children }: { children?: ReactNode | null }) => {
    // Global UI State defaults
    const [uiState, setUiState] = useState<t>(() => {
      // Check localStorage for any saved state first
      const savedState = localStorage.getItem(localStorageKey);
      return savedState ? JSON.parse(savedState) : initialState;
    });

    // On Changes to uiState, update localstorage
    useEffect(() => {
      window.localStorage.setItem(localStorageKey, JSON.stringify(uiState));
    }, [uiState]);

    /** Change global UI state. Accepts a partial of the UI state object */
    const update = (state: Partial<t>) => setUiState(stateSrc => ({ ...stateSrc, ...state }));
    /** Reset state */
    const reset = () => setUiState(initialState);
    return <Context.Provider value={{ ...initialState, update, reset }}>{children}</Context.Provider>;
  };

  return {
    useContext: useUiContext,
    Provider,
  };
};
