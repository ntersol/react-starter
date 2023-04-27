import { NtsState } from './api.models';

export const contextDefault = <t>(): NtsState.Context<t> => ({
  get: () => Promise.resolve(),
  post: () => Promise.resolve(),
  put: () => Promise.resolve(),
  patch: () => Promise.resolve(),
  remove: () => Promise.resolve(),
  request: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  reset: () => {},
  state: null,
  data: null,
});
