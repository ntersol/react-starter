import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { NtsState } from './api.models';
import { apiUrlGet, deleteEntities, is, mergeConfig, mergeDedupeArrays, mergePayloadWithApiResponse } from './api.utils';
import axios, { AxiosResponse } from 'axios';

interface NtsApiStoreCreatorProps<t = any> {
  config: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t>;
  isEntityStore?: boolean;
}

/**
 * Automatically create an api store to manage interaction between a local flux store and a remote api
 */
export function apiStoreCreator<t>({ config, isEntityStore = true }: NtsApiStoreCreatorProps<t>) {
  const [state, setState] = useState(isEntityStore ? getStateEntitySrc() : getStateSrc());

  // Initialize Axios with base url
  const baseApiSvc = axios.create({ baseURL: config.apiUrlBase });
  // Get interceptor
  baseApiSvc.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  /** Stuff to do on load */
  useEffect(() => {});

  function getStateSrc(): NtsState.ApiState<t> {
    return {
      loading: false,
      modifying: false,
      error: false,
      errorModify: false,
      data: null,
    };
  }

  function getStateEntitySrc(): NtsState.EntityApiState<t> {
    return {
      loading: false,
      modifying: false,
      error: false,
      errorModify: false,
      data: null,
      entities: {},
    };
  }

  const Context = createContext<any>({});

  /** Global UI State Context */
  const useApiContext = () => useContext(Context);

  /** Global UI State Provider */
  const Provider = ({ children }: { children?: ReactNode | null }) => {
    /**
     *
     * @param optionsOverride
     * @param postPayload - Some API requests need to use POST instead of GET to return data. Providing a payload will use POST to load the store
     * @returns
     */
    function _get(optionsOverride: NtsState.Options = {}, postPayload?: unknown) {
      const options = mergeConfig(config, optionsOverride);

      if ((state.data === null || options.refresh) && !state.loading) {
        const url = apiUrlGet(options, 'get', null);

        setState(stateSrc => ({ ...stateSrc, loading: true, error: null }));

        const httpRequest = postPayload ? axios.post<any>(url, postPayload) : axios.get(url);

        httpRequest
          .then(r => {
            const result = config.map && config.map.get ? config.map.get(r.data) : r.data;
            const state: Partial<NtsState.ApiState> = { loading: false, data: result, errorModify: null };
            let entities: Record<string, t> | null = null;

            if (isEntityStore && is.entityConfig(config) && config.uniqueId && Array.isArray(result)) {
              entities = result.reduce(
                (a, b) => ({
                  ...a,
                  [b[String(config.uniqueId)]]: b,
                }),
                {},
              );
              state.entities = entities;
            }
            setState(stateSrc => ({ ...stateSrc, ...state }));
          })
          .catch((error: any) => {
            setState(stateSrc => ({ ...stateSrc, loading: false, error }));
          });
        // We do not want users returning data directly from the request which violates unidirection data flow
        // Return empty promise instead so that the app still knows when it completed
        return new Promise((resolve, reject) => {
          httpRequest.then(() => resolve(null)).catch(error => reject(error));
        });
      }
      return Promise.resolve();
    }

    /**
     * Perform a get request to load data into the store
     * @param optionsSrct
     */
    function get(optionsOverride: NtsState.Options = {}) {
      return _get(optionsOverride);
    }

    /**
     * Request is a POST operation that functions a GET. A payload body is passed and the response is loaded into the store
     *
     * Useful for things like search requests that need parameters not in a query string
     * @param payload
     * @param optionsOverride
     */
    function request<p = unknown>(payload: p, optionsOverride?: NtsState.Options) {
      return _get({ refresh: true, ...optionsOverride }, payload);
    }

    function upsert(apiRequest: Promise<AxiosResponse<t, any>>, data: Partial<t>, mapFn?: <t>(x: t | null) => unknown) {
      setState(stateSrc => ({ ...stateSrc, modifying: true, errorModify: null }));
      return apiRequest
        .then(r => {
          // If a map function was provided, modify the data before executing anything else
          const resMapped = mapFn ? mapFn(r.data) : r.data;
          // Merge the api response with the payload
          const resMerged = mergePayloadWithApiResponse(data, resMapped) as t;
          // If this is an entity store
          if (isEntityStore && is.entityConfig(config) && !!state?.data && Array.isArray(state.data)) {
            // TODO: Fix any
            const delta = mergeDedupeArrays(state.data as any, resMerged, config.uniqueId as keyof t);
            setState(stateSrc => ({ ...stateSrc, modifying: false, ...delta }));
            // stateChange({ modifying: false, ...delta });
          } else {
            setState(stateSrc => ({ ...stateSrc, modifying: false, resMerged }));
            //  stateChange({ modifying: false, resMerged });
          }
        })
        .catch(error => {
          setState(stateSrc => ({ ...stateSrc, modifying: false, error }));
        });
    }

    /**
     * Perform a POST request
     * @param data
     * @param optionsOverride
     * @returns
     */
    function post(data: Partial<t>, optionsOverride: NtsState.Options = {}) {
      const options = mergeConfig(config, optionsOverride);
      const url = apiUrlGet(options, 'post', null);
      return upsert(axios.post(url, data), data, config.map?.post);
    }

    /**
     * Perform a PUT request
     * @param data
     * @param optionsOverride
     * @returns
     */
    function put(data: Partial<t>, optionsOverride: NtsState.Options = {}) {
      const options = mergeConfig(config, optionsOverride);
      const url = apiUrlGet(options, 'put', data);
      return upsert(axios.put(url, data), data, config.map?.put);
    }

    /**
     * Perform a PATCH request
     * @param data
     * @param optionsOverride
     * @returns
     */
    function patch(data: Partial<t>, optionsOverride: NtsState.Options = {}) {
      const options = mergeConfig(config, optionsOverride);
      const url = apiUrlGet(options, 'patch', data);
      return upsert(axios.patch(url, data), data, config.map?.patch);
    }

    /**
     * Perform a DELETE request
     * @param data
     * @param optionsOverride
     * @returns
     */
    function deleted(data: Partial<t>, optionsOverride: NtsState.Options = {}) {
      const options = mergeConfig(config, optionsOverride);
      const url = apiUrlGet(options, 'delete', data);
      setState(stateSrc => ({ ...stateSrc, modifying: true, errorModify: null }));
      return axios
        .delete<t>(url)
        .then(r => {
          // Check if this is an entity store
          if (isEntityStore && is.entityConfig(config) && !!state?.data && Array.isArray(state.data)) {
            // Delete entities from store
            const updated = deleteEntities<t>(state.data, data, config.uniqueId as keyof t);
            setState(stateSrc => ({ ...stateSrc, modifying: false, ...updated }));
          } else {
            // Delete on a non entity format
            setState(stateSrc => ({ ...stateSrc, modifying: false, data: r.data || null }));
          }
        })
        .catch(error => setState(stateSrc => ({ ...stateSrc, modifying: false, error })));
    }

    /**
     * Refresh the data in the store
     */
    function refresh(optionsOverride: NtsState.Options = {}) {
      return get({ ...optionsOverride, refresh: true });
    }

    /**
     * Reset store to its initial state
     */
    function reset() {
      setState(isEntityStore ? getStateEntitySrc : getStateSrc);
    }

    return <Context.Provider value={{ state, refresh, reset }}>{children}</Context.Provider>;
  };

  return {
    useContext: useApiContext,
    Provider,
  };
}
