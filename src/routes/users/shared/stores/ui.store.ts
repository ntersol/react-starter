import { Models, useUiStore } from '$shared';

// When declared outside a component, this is persistent
export const routeUiStore = useUiStore<Models.User>({ username: 'test@test.com' }, { localStorageId: 'usersUiStore' });
