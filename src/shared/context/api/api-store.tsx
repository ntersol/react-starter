import { apiStoreCreator } from './api-store-creator.context';
import { NtsState } from './api.models';
import { is, mergeConfig } from './api.utils';

/**
 * Create a curried instance of the api store creator
 * @param configBase Default configuration for all store instances used by this creator. Will be overwritten by individual store properties
 * @example
 * private store =createBaseStore({ apiUrlBase: '//jsonplaceholder.typicode.com' });
 * // An entity store
 * public users = store<Models.User>({ uniqueId: 'id', storeId: 'users', apiUrl: '/users' });
 * // A non-entity store
 * public post = store<Models.Post>({ apiUrl: '/posts/1' });
 * @returns
 */
export const createBaseStore =
  (configBase: NtsState.ConfigApi | NtsState.ConfigEntity) =>
  <t,>(config: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t>) => {
    // Merge base config with specific store config
    const c: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t> = config ? mergeConfig(configBase, config) : config;
    // If a uniqueID is specified, return an entity store. If not return an api store
    return is.entityConfig(c) ? createEntityStore<t>(c) : createApiStore<t>(c);
  };

/**
 * Create a non-entity based api store
 * @param config Configuration for this store
 * @returns
 */
const createApiStore = <t,>(config: NtsState.ConfigApi<t>) => {
  return apiStoreCreator(config, false);
};

/**
 * Create an entity based api store
 * @param config Configuration for this store
 * @returns
 */
const createEntityStore = <t,>(config: NtsState.ConfigEntity<t>) => {
  return apiStoreCreator(config, true);
};
