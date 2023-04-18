import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { NtsState } from '../context/api/api.models';

interface UiState<t> {
  state: t;
  update: (state: Partial<t>) => void;
  reset: () => void;
}

export const uiContext = createContext<UiState<any> | null>(null);
export const uiProvider = ({ children }: { children?: ReactNode | null }) => {};
/**
 *
 * @param initialState
 * @param options
 * @returns
 */
export const useUiStore = <t extends object>(initialState: t, options?: NtsState.UIStoreOptions) => {
  console.log('Initializing useUiStore');
  const Context = createContext<UiState<t> | null>(null);
  /**{
    state: initialState,
    update: () => {
      console.log('Derp');
    },
    reset: () => {},
  } */
  const localStorageKey = 'uiState';

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
    const update = (state: Partial<t>) => {
      console.warn('Updating', update);
      setUiState(stateSrc => ({ ...stateSrc, ...state }));
    };
    /** Reset state */
    const reset = () => setUiState(initialState);
    return <Context.Provider value={{ state: uiState, update, reset }}>{children}</Context.Provider>;
  };

  return {
    useContext: useUiContext,
    Context,
    Provider,
  };
};
