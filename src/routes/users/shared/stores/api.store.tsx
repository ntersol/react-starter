import { createBaseStore } from '$shared';

const storeCreator = createBaseStore({ apiUrlBase: 'https://jsonplaceholder.typicode.com' });

/**
 * Get list of users
 */
export const usersStore = storeCreator({ apiUrl: '/users', uniqueId: 'id' });
/**
 * Get user details
 */
export const userDetailsStore = storeCreator({ apiUrl: '/users' });
