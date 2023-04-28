import { apiStoreCreator as storeCreator } from './api-store-creator.context';
import { NtsState } from './api.models';
import { deepMergeObjects } from './api.utils';

/**
 * Create a standalone non-entity based api store. Use the creator methods for shared config.
 * @param config Configuration for this store
 * @returns
 */
export const createApiStore = <t,>(config: NtsState.ConfigApi<t>) => {
  return storeCreator<t, NtsState.Context<t>>(config, false);
};

/**
 * Create a standalone entity based api store. Use the creator methods for shared config.
 * @param config Configuration for this store
 * @returns
 */
export const createEntityStore = <t,>(config: NtsState.ConfigEntity<t>) => {
  return storeCreator<t[], NtsState.ContextEntities<t>>(config, true);
};

/**
 * Create a curried instance of a non-entity api store creator. This method allows the usage of shared config between stores. Individual stores can override base settings
 * @param configBase Default configuration for all store instances used by this creator. Will be overwritten by individual store properties
 * @example
 * const store = apiStoreCreator({ apiUrlBase: '//jsonplaceholder.typicode.com' });
 * // A non-entity store
 * const post = store<Models.Post>({ apiUrl: '/posts/1' });
 * @returns
 */
export const apiStoreCreator =
  (configBase: NtsState.ConfigApi) =>
  <t,>(config: NtsState.ConfigApi<t>) => {
    // Merge base config with specific store config
    const c = deepMergeObjects(configBase, config);
    return createApiStore<t>(c);
  };

/**
 * Create a curried instance of a non-entity api store creator. This method allows the usage of shared config between stores. Individual stores can override base settings
 * @param configBase Default configuration for all store instances used by this creator. Will be overwritten by individual store properties
 * @example
 * const store = apiStoreCreator({ apiUrlBase: '//jsonplaceholder.typicode.com' });
 * // A non-entity store
 * const post = store<Models.Post>({ apiUrl: '/posts/1' });
 * @returns
 */
export const entityStoreCreator =
  (configBase: NtsState.ConfigEntity) =>
  <t,>(config: NtsState.ConfigEntity<t>) => {
    // Merge base config with specific store config
    const c = deepMergeObjects(configBase, config);
    return createEntityStore<t>(c);
  };

/**
 * TODO: Get the typing of this generic store creator function working. Ideally the app would have one shared config for all api stores
 * Create a curried instance of the api store creator
 * @param configBase Default configuration for all store instances used by this creator. Will be overwritten by individual store properties
 * @example
 * private store =createBaseStore({ apiUrlBase: '//jsonplaceholder.typicode.com' });
 * // An entity store
 * public users = store<Models.User>({ uniqueId: 'id', storeId: 'users', apiUrl: '/users' });
 * // A non-entity store
 * public post = store<Models.Post>({ apiUrl: '/posts/1' });
 * @returns

export const createBaseStore =
  (configBase: NtsState.ConfigApi | NtsState.ConfigEntity) =>
  <t,>(config: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t>) => {
    // Merge base config with specific store config
    const c = mergeConfig(configBase, config);

    // If a uniqueID is specified, return an entity store. If not return an api store
    return isConfigEntity(c) ? createEntityStore<t>(c) : createApiStore<t>(c);
  };
 */
