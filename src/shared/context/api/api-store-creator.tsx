import { useEffect, useState } from 'react';
import { NtsState } from './api.models';
import { apiUrlGet, is, mergeConfig } from './api.utils';
import axios from 'axios';

interface NtsApiStoreCreatorProps<T> {
  config: NtsState.ConfigApi | NtsState.ConfigEntity;
  isEntityStore?: boolean;
}

/**
 *
 * @param param0
 */
export function apiStoreCreator<T>({ config, isEntityStore = true }: NtsApiStoreCreatorProps<T>) {
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

  function getStateSrc(): NtsState.ApiState<T> {
    return {
      loading: false,
      modifying: false,
      error: false,
      errorModify: false,
      data: null,
    };
  }

  function getStateEntitySrc(): NtsState.EntityApiState<T> {
    return {
      loading: false,
      modifying: false,
      error: false,
      errorModify: false,
      data: null,
      entities: {},
    };
  }

  /**
   *
   * @param optionsOverride
   * @param postPayload
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
          const result = config.map && config.map.get ? config.map.get(r) : r;
          const state: Partial<NtsState.ApiState> = { loading: false, data: result, errorModify: null };
          let entities: Record<string, T> | null = null;

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

  function get(optionsOverride: NtsState.Options = {}) {
    return _get(optionsOverride);
  }

  function request<p = unknown>(payload: p, optionsOverride?: NtsState.Options) {
    return _get({ refresh: true, ...optionsOverride }, payload);
  }

  return { get, request };
}
