import { ReactNode, createContext, useContext } from 'react';

/**
 *
 * @param contextModel
 * @returns
 */
export const createApiContext = <t,>(contextModel: t | (() => t)) => {
  const CoreContext = createContext(contextModel);

  const contextToUse = useContext(CoreContext);

  const provider = ({ children }: { children?: ReactNode | null }) => {
    return <CoreContext.Provider value={contextModel}>{children}</CoreContext.Provider>;
  };

  return { context: contextToUse, provider };
};
