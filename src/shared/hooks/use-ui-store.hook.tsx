import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { NtsState } from '../context/api/api.models';

interface UiState<t> {
  state: t;
  update: (state: Partial<t>) => void;
  reset: () => void;
}
// State Initial is fed initially do the createContext hook even tho null is standard
// This will allow strict null checks to work. Without this if the context API hook is implemented wrong
// It will cause a nil error
const stateInitial = <t,>(state: t): UiState<t> => ({ state, update: _state => {}, reset: () => {} });

/**
 *
 * @param initialState
 * @param options
 * @returns
 */
export const useUiStore = <t extends object>(initialState: t, options?: NtsState.UIStoreOptions) => {
  const Context = createContext<UiState<t>>(stateInitial(initialState));

  /** Global UI State Context */
  const useUiContext = () => useContext(Context);

  /** Global UI State Provider */
  const Provider = ({ children }: { children?: ReactNode | null }) => {
    // Global UI State defaults
    const [uiState, setUiState] = useState<t>(() => {
      if (!options?.persistId) {
        return initialState;
      }
      // Check localStorage for any saved state first
      const savedState = localStorage.getItem(options.persistId);
      return savedState ? JSON.parse(savedState) : initialState;
    });

    // On Changes to uiState, update localstorage
    useEffect(() => {
      if (options?.persistId) {
        window.localStorage.setItem(options?.persistId, JSON.stringify(uiState));
      }
    }, [uiState]);

    /** Change global UI state. Accepts a partial of the UI state object */
    const update = (state: Partial<t>) => setUiState(stateSrc => ({ ...stateSrc, ...state }));
    /** Reset state */
    const reset = () => setUiState(initialState);
    return <Context.Provider value={{ state: uiState, update, reset }}>{children}</Context.Provider>;
  };

  return {
    useContext: useUiContext,
    Provider,
  };
};
