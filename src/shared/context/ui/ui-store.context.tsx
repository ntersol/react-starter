import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { NtsState } from '../api/api.models';

/** Keeps track of stores that use persistent IDs for localstorage to prevent collisions */
let storeIds: string[] = [];

/** Default UI state */
interface UiState<t> {
  state: t;
  update: (state: Partial<t>) => void;
  reset: () => void;
}
// State Initial is fed initially do the createContext hook even though null is standard
// This will allow strict null checks to work.
// Without this if the context API hook is implemented wrong it will cause a nil error on runtime
const stateInitial = <t,>(state: t): UiState<t> => ({ state, update: _state => {}, reset: () => {} });

/**
*  Hook to generate a UI store which is used to manage UI state
*  @template t The type of the state.
*  @param {t} initialState The initial state of the hook.
*  @param {NtsState.UIStoreOptions} [options] Optional options to configure the hook.
*  @returns {Object} Returns an object containing the UI context and provider.
*  @example
import { Models, useUiStore } from '$shared';
import { Users } from './users';

export const usersUiStore = useUiStore<Models.User>({ username: 'test@test.com' }, { localStorageId: 'usersUiStore' });

export function UsersRoute() {
  return (
    <usersUiStore.Provider>
      <Users></Users>
    </usersUiStore.Provider>
  );
}
// In a lower order component:
import { usersUiStore } from './users.route';

export function Users() {
  const { state, update, reset } = usersUiStore.useContext();
}
*/
export const useUiStore = <t extends object>(initialState: t, options?: NtsState.UIStoreOptions) => {
  // If store ID specified
  if (options?.localStorageId) {
    // Throw an error if the store ID has already been used, otherwise put in the storeIds array for future checking
    // This will prevent collisions with localStorage
    storeIds.includes(options?.localStorageId)
      ? console.error(`A store ID of ${options?.localStorageId} is already in use by another store. Please use another ID to avoid collisions in localStorage.`)
      : (storeIds = [...storeIds, options?.localStorageId]);
  }

  const Context = createContext<UiState<t>>(stateInitial(initialState));

  /** Global UI State Context */
  const useUiContext = () => useContext(Context);

  /** Global UI State Provider */
  const Provider = ({ children }: { children?: ReactNode | null }) => {
    // Global UI State defaults
    const [uiState, setUiState] = useState<t>(() => {
      if (!options?.localStorageId) {
        return initialState;
      }
      // Check localStorage for any saved state first
      const savedState = localStorage.getItem(options.localStorageId);
      return savedState ? JSON.parse(savedState) : initialState;
    });

    // On Changes to uiState, update localstorage
    useEffect(() => {
      if (options?.localStorageId) {
        window.localStorage.setItem(options?.localStorageId, JSON.stringify(uiState));
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
