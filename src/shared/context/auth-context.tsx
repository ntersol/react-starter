import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStorage, useThrottledFunction } from '../hooks';
import { Models } from '../models/global.models';

/** Set to true if no login or logout APIs are available, those will be mocked */
const devMode = true;

type LogOutReason = 'sessionExpired' | 'userInitiated' | 'notLoggedIn';

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
  logout: (logOutReason?: LogOutReason | null, previousUrl?: string | null) => void;
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
  /**
   * Hooks/Vars
   */
  const { getItem, setItem, removeItem } = useStorage();
  const { search } = useLocation();
  const navigate = useNavigate();
  const location = useLocation();
  // Number of milliseconds for inactivity timeout (5 minutes in this case)
  const INACTIVITY_TIMEOUT = 3000; //5 * 60 * 1000;

  /**
   * State
   */
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    loggedOutReason: null,
    error: null,
    waiting: false,
  });
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Models.User | null>(null);

  // Timeout ID for inactivity timer
  let inactivityTimeout: number;

  // Debounce the handleSearch function with a delay of 300 milliseconds
  const throttleHandleSearch = useThrottledFunction(() => {
    console.log('handleUserActivity');
    clearTimeout(inactivityTimeout);
    startInactivityTimer();
  }, 1000);

  /**
   * On Init
   */
  useEffect(() => {
    const storedToken = getItem('token');
    const storedUser = getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    // Attach event listeners for user activity events
    document.addEventListener('mousemove', throttleHandleSearch);
    document.addEventListener('keydown', throttleHandleSearch);

    // Start the initial inactivity timer
    startInactivityTimer();

    // Cleanup the event listeners when the component is unmounted
    return () => {
      document.removeEventListener('mousemove', throttleHandleSearch);
      document.removeEventListener('keydown', throttleHandleSearch);
      clearTimeout(inactivityTimeout);
    };
  }, []);

  /**
   * Methods
   */

  /**
   * Start the inactivity timer
   */
  const startInactivityTimer = () => {
    // Clear the previous timeout, if any
    clearTimeout(inactivityTimeout);

    // Set a new timeout for the specified inactivity duration
    inactivityTimeout = window.setTimeout(() => {
      // Perform the logout action after the inactivity duration
      logout('sessionExpired');
    }, INACTIVITY_TIMEOUT);
  };

  /**
   * Log into the application
   * @param username
   * @param password
   * @returns
   */
  const login = (username: string, password: string) => {
    setAuthState(stateSrc => ({ ...stateSrc, error: null, waiting: true }));

    const queryParams = new URLSearchParams(search);
    const previousUrl = queryParams.get('previousUrl');
    // Support devmode/mocked api request
    const apiRequest = devMode ? fakeLogin() : axios.post<Models.AuthState>('/api/login', { username, password });
    return apiRequest
      .then(response => {
        if (!response?.data) {
          console.error('API response malformed');
          return;
        }
        const { token, user } = response.data;

        setAuthState(stateSrc => ({ ...stateSrc, isLoggedIn: true, waiting: false }));
        setToken(token);
        setUser(user || null);
        setItem('token', token);
        setItem('user', user || null);
        navigate(previousUrl || '/');
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
    setAuthState(stateSrc => ({ ...stateSrc, error: null, isLoggedIn: false, loggedOutReason: logOutReason || null }));
    removeItem('token');
    removeItem('user');

    const queryString = `?previousUrl=${encodeURIComponent(location.pathname)}`;
    const loginUrl = '/login' + queryString;

    navigate(loginUrl);
    // Support devmode/mocked api request
    const apiRequest = devMode ? fakeLogout() : axios.post('/api/logout', {});

    apiRequest
      .then(() => setAuthState(stateSrc => ({ ...stateSrc })))
      .catch(error => {
        setAuthState(stateSrc => ({ ...stateSrc, error }));
        throw new Error('Login failed');
      });
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

function fakeLogout(): Promise<AxiosResponse<void>> {
  return new Promise(resolve => {
    return resolve;
  });
}

/** Used to create a fake login response for when a login API is not possible */
function fakeLogin(): Promise<Partial<AxiosResponse<Models.AuthState>>> {
  return new Promise<Partial<AxiosResponse<Models.AuthState>>>(resolve => {
    // Simulating an asynchronous operation to fetch the AuthState
    setTimeout(() => {
      const authState: Models.AuthState = {
        isLoggedIn: true,
        token: 'my-auth-token',
        user: {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          address: {
            street: '123 Main St',
            suite: 'Apt 4B',
            city: 'New York',
            zipcode: '12345',
            geo: {
              lat: '40.7128',
              lng: '-74.0060',
            },
          },
          phone: '555-1234',
          website: 'example.com',
          company: {
            name: 'ABC Company',
            catchPhrase: 'Lorem ipsum dolor sit amet',
            bs: 'Lorem ipsum',
          },
        },
      };

      const response: Partial<AxiosResponse<Models.AuthState>> = {
        data: authState,
        status: 200,
        statusText: 'OK',
      };

      resolve(response);
    }, 2000); // Simulating a delay of 1 second
  });
}
