import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';

import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;

  error: string | null;
  /** Waiting for an API request to complete */
  waiting: boolean;
}

interface AuthContextData extends AuthState {
  user: UserInfo | null;
  token: string | null;
  /** Errors from log in/log out requests */
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
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
    error: null,
    waiting: false,
  });

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    setAuthState(stateSrc => ({ ...stateSrc, error: null, waiting: true }));
    return axios
      .post('/api/login', { username, password })
      .then(response => {
        const { token, user } = response.data;
        setAuthState(stateSrc => ({ ...stateSrc, isLoggedIn: true, waiting: false }));
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        setAuthState(stateSrc => ({ ...stateSrc, error, waiting: false }));
        throw new Error('Login failed');
      });
  };

  /**
   * Log the user out
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthState(stateSrc => ({ ...stateSrc, error: null, waiting: true, isLoggedIn: false }));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    <AuthContext.Provider value={{ isLoggedIn: authState.isLoggedIn, error: authState.error, waiting: authState.waiting, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
