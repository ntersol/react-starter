import { Models, appApiStoreCreator, appEntityStoreCreator } from '$shared';

/**
 * Get list of users
 */
export const usersStore = appEntityStoreCreator<Models.User>({ apiUrl: '/users', uniqueId: 'id' });

/**
 * Get user details
 */
export const userDetailsStore = appApiStoreCreator<Models.User>({ apiUrl: '/users' });
