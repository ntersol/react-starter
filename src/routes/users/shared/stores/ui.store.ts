import { Models, createUiStore } from '$shared';

// When declared outside a component, this is persistent
export const usersUiStore = createUiStore<Models.User | null>({ username: 'test@test.com' }, { localStorageId: 'usersUiStore' });
