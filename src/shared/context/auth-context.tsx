import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  isLoggedIn: boolean;
  token: string | null;
  /** Errors from log in/log out requests */
  error: string | null;
  /** Waiting for an API request to complete */
  waiting: boolean;
  user: UserInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    setError(null);
    setWaiting(true);
    return axios
      .post('/api/login', { username, password })
      .then(response => {
        const { token, user } = response.data;
        setIsLoggedIn(true);
        setToken(token);
        setUser(user);
        setWaiting(false);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        setError(error);
        setWaiting(false);
        throw new Error('Login failed');
      });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);
    setWaiting(true);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    axios
      .post('/api/login', {})
      .then(() => {
        setWaiting(false);
      })
      .catch(error => {
        setError(error);
        setWaiting(false);
        throw new Error('Login failed');
      });
  };

  return <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout, error, waiting }}>{children}</AuthContext.Provider>;
};
