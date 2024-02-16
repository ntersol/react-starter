import axios from 'axios';

import { Models } from '$shared';
import React, { useEffect, useState } from 'react';

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

export const AutoComplete = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // On Init
    getUsers(null, true);
    // On unmount
    return () => {
      console.log('Unload');
    };
  }, []);

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
      setTimeout(() => {
        Promise.all([getUsers(value), axios.get<any[]>('https://jsonplaceholder.typicode.com/posts')]).then(
          ([users, posts]) => {
            stateChange({
              loading: false,
              users,
              posts: posts.data.filter(user =>
                JSON.stringify(user)
                  .toLowerCase()
                  .replace(/[^a-zA-Z ]/g, '')
                  .includes(value.toLowerCase().replace(/[^a-zA-Z ]/g, '')),
              ),
            });
          },
          error => stateChange({ loading: false, error }),
        );
      }, 500);
    }
  };

  /**
   * Return users from the web API
   * @param searchValue - A search term to filter data against. If nil will return all results
   * @param addData - Manually add the data to state instead of just returning it
   * @returns
   */
  function getUsers(searchValue?: string | null, addData = false) {
    return axios.get<Models.User[]>('https://jsonplaceholder.typicode.com/users').then(response => {
      const users = !searchValue
        ? response.data
        : response.data.filter(user =>
            JSON.stringify(user)
              .toLowerCase()
              .replace(/[^a-zA-Z ]/g, '')
              .includes((searchValue ?? '').toLowerCase().replace(/[^a-zA-Z ]/g, '')),
          );
      if (addData) {
        stateChange({ users });
      }
      return users;
    });
  }

  return (
    <div>
      <input onChange={debounceInputChanges} />
      {state.loading && <div>Loading</div>}
      {!!state.error && <div>Error:{state.error}</div>}
      <h2>Users</h2>
      {state.users?.length ? state.users?.map(user => <div key={user.id}>{user.name}</div>) : <div>No users found</div>}
      <hr />
      <h2>Posts</h2>
      {state.posts?.length ? state.posts?.map(post => <div key={post.id}>{post.name}</div>) : <div>No posts found</div>}
    </div>
  );
};
