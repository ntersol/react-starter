import { ReactNode, createContext, useContext } from 'react';

export const ThemeContext = createContext('light');

const isFunction = (value: unknown): value is Function => typeof value === 'function';

/**
 *
 * @param contextModel
 * @returns
 */
export const createApiContext = <t,>(contextModel: t | (() => t)) => {
  const c = isFunction(contextModel) ? contextModel() : contextModel;
  const CoreContext = createContext(c);

  const contextToUse = useContext(CoreContext);

  const provider = ({ children }: { children?: ReactNode | null }) => {
    return <CoreContext.Provider value={c}>{children}</CoreContext.Provider>;
  };

  return { context: contextToUse, provider };
};
