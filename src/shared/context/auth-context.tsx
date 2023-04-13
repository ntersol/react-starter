import React, { createContext, useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Models } from '../models/global.models';
import axios from 'axios';

type LogoutReason = 'sessionExpired' | 'manualLogOut' | null;

export interface AuthState {
  isLoggedIn: boolean;
  loggedOutReason: LogoutReason;
  error: string | null;
  token: string | null;
  userInfo?: any | null;
}

export interface AuthStore {
  logIn: any;
  logOut: any;
  tokenRefresh: any;
  children?: any | null;
  state: AuthState;
}

export interface LogIn {
  username: string;
  password: string;
}

export interface AuthSuccess {
  token: string;
  user: any;
}

const initialAuthState: AuthState = { loggedOutReason: null, error: null, isLoggedIn: false, token: null, userInfo: null };
const initialState: AuthStore = { tokenRefresh: null, logIn: null, logOut: null, state: initialAuthState };
/**
 * Context for starter
 */
export const AuthContext = createContext<AuthStore>(initialState);

/**
 * Starter context provider
 * @param param0
 * @returns
 */
export const AuthProvider: FC<AuthStore> = function ({ children }) {
  const [authState, setAuthState] = useState({ ...initialAuthState });
  const store: AuthStore = {
    logIn: (userLogin: LogIn) => {
      axios
        .post<AuthSuccess>('', userLogin)
        .then(response => {
          setAuthState(stateOld => ({ ...stateOld, ...response }));
        })
        .catch(error => {
          setAuthState(stateOld => ({ ...stateOld, error }));
        });
    },
    logOut: (reason?: LogoutReason) => {
      axios
        .post('')
        .then(() => {
          setAuthState(stateOld => ({ ...stateOld, token: null, userInfo: null, loggedOutReason: reason ?? null }));
          const navigate = useNavigate();
          navigate('/login');
        })
        .catch(error => {
          setAuthState(stateOld => ({ ...stateOld, error }));
        });
    },
    tokenRefresh: () => {},
    state: authState,
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};
