import { NtsState } from './api.models';

const ApiState: NtsState.EitherState = {
  loading: false,
  modifying: false,
  error: null,
  errorModify: null,
  data: null,
};

export const contextDefault = <t>(): NtsState.Context<t> => ({
  get: () => Promise.resolve(),
  post: () => Promise.resolve(),
  put: () => Promise.resolve(),
  patch: () => Promise.resolve(),
  remove: () => Promise.resolve(),
  request: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  reset: () => {},
  state: ApiState,
  data: null,
});
