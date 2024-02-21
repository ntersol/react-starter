import axios from 'axios';

import { Models } from '$shared';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface AutoCompleteState<t, y> {
  textValue: string | null;
  users: t | null;
  posts: y | null;
  loading: boolean;
  error: string | null;
}

type AutoCompleteStateTyped = AutoCompleteState<Models.User[], any[]>;

const initialState: AutoCompleteStateTyped = {
  textValue: null,
  users: null,
  posts: null,
  loading: false,
  error: null,
};

export const AutoComplete: React.FC = () => {
  // State management
  const [state, setState] = useState(initialState);
  // Is component mounted, use to prevent async operations when unmounted
  const isMounted = useRef(false);
  // Clear up and running debounce operation
  const timeoutIdRef = useRef<number | null>(null);

  console.log('Initing');

  /**
   * Make changes to state
   * @param stateNew
   */
  function stateChange(stateNew: Partial<AutoCompleteStateTyped>) {
    setState(stateOld => ({ ...stateOld, ...stateNew }));
  }

  /**
   * Debounce an input
   */
  let isDebouncing = false;
  let value = '';
  const debounceInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    value = e.target.value;
    stateChange({ textValue: value, loading: true });

    if (!isDebouncing) {
      isDebouncing = true;
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = window.setTimeout(() => {
        Promise.all([getUsers(value), getPosts(value)]).then(
          ([users, posts]) => {
            isDebouncing = false;
            if (isMounted.current) {
              stateChange({
                loading: false,
                users,
                posts,
              });
            }
          },
          error => stateChange({ loading: false, error }),
        );
      }, 1000);
    }
  };

  /**
   * Return users from the web API
   * @param searchValue - A search term to filter data against. If nil will return all results
   * @param addData - Manually add the data to state instead of just returning it
   * @returns
   */
  const getUsers = useCallback((searchValue?: string | null, addData = false) => {
    return axios.get<Models.User[]>('https://jsonplaceholder.typicode.com/users').then(response => {
      const users = !searchValue
        ? response.data
        : response.data.filter(user =>
            JSON.stringify(user)
              .toLowerCase()
              .replace(/[^a-zA-Z ]/g, '')
              .includes((searchValue ?? '').toLowerCase().replace(/[^a-zA-Z ]/g, '')),
          );
      if (addData && isMounted.current) {
        stateChange({ users });
      }
      return users;
    });
  }, []);

  /**
   * Get all posts
   * @param searchValue - Optional filter value
   * @param addData - Add data directly to state in addition to being returned
   * @returns
   */
  function getPosts(searchValue?: string | null, addData = false) {
    console.log(1);
    return axios.get<any[]>('https://jsonplaceholder.typicode.com/posts').then(response => {
      const posts = !searchValue
        ? response.data
        : response.data.filter(post =>
            JSON.stringify(post)
              .toLowerCase()
              .replace(/[^a-zA-Z ]/g, '')
              .includes((searchValue ?? '').toLowerCase().replace(/[^a-zA-Z ]/g, '')),
          );
      if (addData && isMounted.current) {
        stateChange({ posts });
      }
      return posts;
    });
  }

  useEffect(() => {
    isMounted.current = true;
    // On Init
    console.log('useEffect');
    // Load initial list of users
    getUsers(null, true);
    // On unmount
    return () => {
      isMounted.current = false;
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [getUsers]);

  return (
    <div>
      <input value={state.textValue ?? ''} onChange={debounceInputChanges} />
      <ApiState loading={state.loading} error={state.error}></ApiState>
      <hr />
      <DisplayOutput users={state.users} posts={state.posts}></DisplayOutput>
    </div>
  );
};

/**
 * Display users and posts
 * @param param0
 * @returns
 */
export const DisplayOutput: React.FC<Partial<AutoCompleteStateTyped>> = ({ users, posts }) => {
  // export const DisplayOutput: React.FC<{ state: AutoCompleteStateTyped }> = ({ state }) => {
  // const { users, posts }: AutoCompleteStateTyped = state;
  return (
    <>
      <h2>Users</h2>
      {users?.length ? users?.map(user => <div key={user.id}>{user.name}</div>) : <div>No users found</div>}
      <hr />
      <h2>Posts</h2>
      {posts?.length ? posts?.map(post => <div key={post.id}>{post.title}</div>) : <div>No posts found</div>}
    </>
  );
};

/**
 * Display API state
 * @param param0
 * @returns
 */
function ApiState({ loading, error }: Partial<AutoCompleteStateTyped>) {
  return (
    <>
      {loading && <div>Loading</div>}
      {!!error && <div>Error:{error}</div>}
    </>
  );
}
