import { ReactNode } from 'react';
import { NtsState } from '../context/api/api.models';
import { ProgressBar } from 'primereact/progressbar';

export function ApiState({ children, state }: { children: ReactNode; state: NtsState.ApiStateSrc }) {
  return (
    <>
      {state.loading && <ProgressBar mode="indeterminate" style={{ height: '12px' }} />}
      {!state.loading && children}
    </>
  );
}
