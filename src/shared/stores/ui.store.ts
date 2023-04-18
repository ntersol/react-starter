import { useUiStore } from '../context';
import { Models } from '../models/global.models';

/**
 * Store for global UI state
 */
export const globalUiStore = useUiStore<Models.GlobalUIState>({ name: '' }, { localStorageId: 'globalUiStore' });
