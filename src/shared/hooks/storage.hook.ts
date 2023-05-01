/* eslint-disable no-redeclare */

import { Models } from '../models/global.models';

/** Keys added to this array will tell the hook that the payload is JSON and will be automatcally de/serialized when getting/setting */
const jsonKeys = ['token'];

/**
 * Wraps localStorage and provides typesafety and automatic JSON de/serialization
 * @returns
 */
export const useStorage = () => {
  /**
   * Returns the current value associated with the given key, or null if the given key does not exist.
   *
   * For keys in the "jsonKeys" array, it will automatically serialize objects and arrays
   * @param key
   * @param value
   */
  function getItem(key: 'user'): Models.User | null;
  function getItem(key: 'token'): string | null;
  function getItem(key: string): string | null;
  function getItem(key: string): Models.User | string | null {
    let item = localStorage.getItem(key);
    if (item && jsonKeys.includes(key)) {
      item = JSON.parse(item);
    }
    return item;
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   *
   * For keys in the "jsonKeys" array, it will automatically deserialize objects and arrays
   * @param key
   * @param value
   */
  function setItem(key: 'user', value: Models.User | null): void;
  function setItem(key: 'token', value: string | null): void;
  function setItem(key: string, value: string | null): void;
  function setItem(key: string, value: any | null): void {
    if (value && jsonKeys.includes(key)) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  return {
    setItem,
    getItem,
  };
};
