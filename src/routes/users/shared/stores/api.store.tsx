import { Models, entityStoreCreator } from '$shared';

const storeCreator = entityStoreCreator({ apiUrlBase: 'https://jsonplaceholder.typicode.com', uniqueId: 'id' });

/**
 * Get list of users
 */
export const usersStore = storeCreator<Models.User>({ apiUrl: '/users', uniqueId: 'id' });

export const temp = storeCreator<Models.User>({ apiUrl: '/users', uniqueId: 'id' });

/**
 * Get user details
 */
// export const userDetailsStore = storeCreator({ apiUrl: '/users' });
