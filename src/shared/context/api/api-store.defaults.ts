import { NtsState } from './api.models';

const ApiState: NtsState.EitherState = {
  loading: false,
  modifying: false,
  error: null,
  errorModify: null,
  data: null,
};

export const contextDefault = <t>(): NtsState.Context<t> => ({
  get: (optionsOverride?: NtsState.Options, postPayload?: unknown) => {
    console.error('If you are seeing this error then you forgot to wrap a parent component with the provider');
    return Promise.resolve();
  },
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

export const contextEntities = <t>(): NtsState.ContextEntities<t> => ({
  get: (optionsOverride?: NtsState.Options, postPayload?: unknown) => {
    console.error('If you are seeing this error then you forgot to wrap a parent component with the provider');
    return Promise.resolve();
  },
  post: () => Promise.resolve(),
  put: () => Promise.resolve(),
  patch: () => Promise.resolve(),
  remove: () => Promise.resolve(),
  request: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
  reset: () => {},
  entities: {},
  state: ApiState,
  data: null,
});
