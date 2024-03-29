import { ReactNode, createContext, useContext, useState } from 'react';

export interface GlobalUIState {
  name?: string | null;
}

interface GlobalUIProvider {
  /**
   * Global UI State
   */
  state: GlobalUIState;
  /**
   * Update global UI state
   * @param state
   */
  update: (state: Partial<GlobalUIState>) => void;
  /**
   * Reset global UI state
   * @returns
   */
  reset: () => void;
}

// Initial default state. Used for reset or rehydration
const uiStateDefault: GlobalUIState = {
  name: null,
};

const UIGlobalContext = createContext<GlobalUIProvider>({
  state: { ...uiStateDefault },
  update: (_state: Partial<GlobalUIState>) => {},
  reset: () => {},
});

export const useUIGlobal = () => useContext(UIGlobalContext);

export const UIGlobalProvider = ({ children }: { children?: ReactNode | null }) => {
  // Global UI State defaults
  const [uiState, setUiState] = useState<GlobalUIState>(() => {
    // Check localStorage for any saved state first
    const savedState = localStorage.getItem('globalUIState');
    return savedState ? JSON.parse(savedState) : { ...uiStateDefault };
  });

  /**
   * Update global UI state
   * @param state
   */
  const update = (state: Partial<GlobalUIState>) => {
    setUiState(stateOld => ({ ...stateOld, ...state }));
  };

  /**
   * Reset global UI state
   */
  const reset = () => {
    setUiState(uiStateDefault);
  };

  return (
    <UIGlobalContext.Provider
      value={{
        state: uiState,
        update,
        reset,
      }}
    >
      {children}
    </UIGlobalContext.Provider>
  );
};
