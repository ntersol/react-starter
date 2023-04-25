import { ReactNode, useEffect, useState } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { NtsState } from '../context/api/api.models';
import { Messages } from 'primereact/messages';

interface ApiStateProps {
  state: NtsState.ApiState | NtsState.EntityApiState | undefined | null;
  modify?: boolean;
  showLoading?: boolean;
  showModifying?: boolean;
  showErrorLoading?: boolean;
  showErrorModifying?: boolean;
  children?: ReactNode;
}

export const ApiState = ({ state, children, showLoading = true, showModifying = true, showErrorLoading = true, showErrorModifying = true }: ApiStateProps) => {
  /** Holds combined state of any number entity state objects */
  const [stateSrc, setStateSrc] = useState<NtsState.ApiState | NtsState.EntityApiState | undefined | null>(state);

  // Update state on state change
  useEffect(() => {
    setStateSrc(state);
  }, [state]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Loading, no data */}
      {!stateSrc || (showLoading && stateSrc?.loading && !stateSrc?.data) ? (
        <ProgressBar mode="indeterminate" className="nts-state-spacer" style={{ height: '12px' }} />
      ) : null}

      {/* Loading with data OR modifying */}
      {(showLoading && stateSrc?.loading && stateSrc?.data) || (showModifying && stateSrc?.modifying) ? (
        <ProgressBar mode="indeterminate" className="nts-state-spacer" style={{ height: '2px', position: 'absolute', top: '0', zIndex: '25', width: '100%' }} />
      ) : null}

      {/* Loading error */}
      {showLoading && showErrorLoading && stateSrc?.error ? <Messages>{stateSrc?.error}</Messages> : null}

      {/* Modifying error */}
      {showModifying && showErrorModifying && stateSrc?.errorModify && !stateSrc?.error ? <Messages>{stateSrc?.errorModify}</Messages> : null}

      {/* Content from parent */}
      {stateSrc?.data !== null ? <>{children}</> : null}
    </div>
  );
};
