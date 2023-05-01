import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks';
import { Models } from '../models/global.models';

type LogOutReason = 'sessionExpired' | 'userInitiated';

interface AuthState {
  isLoggedIn: boolean;
  loggedOutReason: LogOutReason | null;
  error: string | null;
  /** Waiting for an API request to complete */
  waiting: boolean;
}

interface AuthContextData extends AuthState {
  user: Models.User | null;
  token: string | null;
  /** Errors from log in/log out requests */
  login: (email: string, password: string) => Promise<void>;
  logout: (logOutReason?: LogOutReason | null) => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  loggedOutReason: null,
  token: null,
  user: null,
  error: null,
  waiting: false,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children?: ReactNode | null }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    loggedOutReason: null,
    error: null,
    waiting: false,
  });
  const { getItem, setItem, removeItem } = useStorage();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Models.User | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = getItem('token');
    const storedUser = getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  /**
   * Log into the application
   * @param username
   * @param password
   * @returns
   */
  const login = (username: string, password: string) => {
    setAuthState(stateSrc => ({ ...stateSrc, error: null, waiting: true }));
    return axios
      .post<Models.AuthState>('/api/login', { username, password }) // TODO: Type auth response
      .then(response => {
        const { token, user } = response.data;
        setAuthState(stateSrc => ({ ...stateSrc, isLoggedIn: true, waiting: false }));
        setToken(token);
        setUser(user || null);
        setItem('token', token);
        setItem('user', user || null);
      })
      .catch(error => {
        setAuthState(stateSrc => ({ ...stateSrc, error, waiting: false }));
        throw new Error('Login failed');
      });
  };

  /**
   * Log the user out
   */
  const logout = (logOutReason?: LogOutReason | null) => {
    setToken(null);
    setUser(null);
    setAuthState(stateSrc => ({ ...stateSrc, error: null, waiting: true, isLoggedIn: false, loggedOutReason: logOutReason || null }));
    removeItem('token');
    removeItem('user');
    // const loc = useLocation();

    navigate('/login');
    // Need redirect
    axios
      .post('/api/logout', {})
      .then(() => {
        setAuthState(stateSrc => ({ ...stateSrc, waiting: false }));
      })
      .catch(error => {
        setAuthState(stateSrc => ({ ...stateSrc, error, waiting: false }));
        throw new Error('Login failed');
      });

    // return <Navigate replace={true} to="/login" />;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        error: authState.error,
        loggedOutReason: authState.loggedOutReason,
        waiting: authState.waiting,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
