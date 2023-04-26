import { createBaseStore } from 'shared';

const storeCreator = createBaseStore({ apiUrlBase: 'https://jsonplaceholder.typicode.com' });

export const usersStore = storeCreator({ apiUrl: '/users', uniqueId: 'id' });
