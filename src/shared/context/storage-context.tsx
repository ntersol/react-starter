import React, { createContext, useCallback, useEffect, useRef } from 'react';

type StorageOptions = {
  isJson?: boolean;
};

type NoJsonStorageOptions = StorageOptions & { isJson: false };
type JsonStorageOptions<T> = StorageOptions & { isJson: true; defaultValue: T };
type StorageServiceOptions<T> = JsonStorageOptions<T> | NoJsonStorageOptions;

type BaseStorageServiceProps<Keys> = {
  useSessionStorage?: boolean;
  children: React.ReactNode;
};

type BaseStorageServiceInstance<Keys> = {
  getItem: <T>(key: Keys, options?: StorageServiceOptions<T>) => T | null;
  setItem: <T>(key: Keys, value: T | null | undefined) => void;
  removeItem: (key: Keys) => void;
};

function createStorageService<Keys>(useSessionStorage = false) {
  const storage = useSessionStorage ? sessionStorage : localStorage;

  const getItem = <T,>(key: Keys, options?: StorageServiceOptions<T>): T | null => {
    const val = storage.getItem(String(key));
    if (val !== null && options?.isJson) {
      return JSON.parse(val) as T;
    }
    return val as T;
  };

  const setItem = <T,>(key: Keys, value: T | null | undefined) => {
    if (value === null || value === undefined) {
      removeItem(key);
    } else {
      const val = typeof value === 'string' ? value : JSON.stringify(value);
      storage.setItem(String(key), val);
    }
  };

  const removeItem = (key: Keys) => {
    storage.removeItem(String(key));
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
}

const BaseStorageServiceContext = createContext<BaseStorageServiceInstance<any>>(null!);

function BaseStorageServiceProvider<Keys>({ useSessionStorage = false, children }: BaseStorageServiceProps<Keys>) {
  const storageService = useRef<BaseStorageServiceInstance<Keys>>(createStorageService(useSessionStorage)).current;
  const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

  const isBrowser = !isNode;

  useEffect(() => {
    const update = () => {
      // do nothing
    };
    if (isBrowser) {
      window.addEventListener('storage', update);
    }
    return () => {
      if (isBrowser) {
        window.removeEventListener('storage', update);
      }
    };
  }, []);

  const getItem = useCallback<BaseStorageServiceInstance<Keys>['getItem']>(
    (key, options) => {
      return storageService.getItem(key, options);
    },
    [storageService],
  );

  const setItem = useCallback<BaseStorageServiceInstance<Keys>['setItem']>(
    (key, value) => {
      storageService.setItem(key, value);
    },
    [storageService],
  );

  const removeItem = useCallback<BaseStorageServiceInstance<Keys>['removeItem']>(
    key => {
      storageService.removeItem(key);
    },
    [storageService],
  );

  const contextValue = { getItem, setItem, removeItem };

  return <BaseStorageServiceContext.Provider value={contextValue}>{children}</BaseStorageServiceContext.Provider>;
}

export { BaseStorageServiceProvider, BaseStorageServiceContext };
