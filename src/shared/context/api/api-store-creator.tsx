import axios from 'axios';
import { useState } from 'react';
import { NtsState } from './api.models';
import { is, mergeConfig } from './api.utils';

const baseApiCreator = axios.create({
  baseURL: 'https://example.com/api',
});

baseApiCreator.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createBaseStore =
  (configBase: NtsState.ConfigApi | NtsState.ConfigEntity) =>
  <t,>(config: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t>) => {
    // Merge base config with specific store config
    const c: NtsState.ConfigApi<t> | NtsState.ConfigEntity<t> = config ? mergeConfig(configBase, config) : config;
    // If a uniqueID is specified, return an entity store. If not return an api store
    return is.entityConfig(c) ? createEntityStore<t>(c) : createApiStore<t>(c);
  };

const createApiStore = <t,>(config: NtsState.ConfigApi<t>) => {};

const createEntityStore = <t,>(config: NtsState.ConfigEntity<t>) => {};
