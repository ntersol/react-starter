import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

/**
 * A route guard that requires the user to be authenticated before accessing
 * @param props
 * @example
 * <Route path="/users" element={ <PrivateRoute> <Users /> </PrivateRoute> }  />
 * @returns
 */
export const AuthenticatedRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { isLoggedIn, logout } = useAuth();
  if (!isLoggedIn) {
    logout();
  }
  return <>{children}</>;
};
