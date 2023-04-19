import React from 'react';
import { useAuth } from '../context';

/**
 * A route guard that requires the user to be authenticated before accessing
 * @param props
 * @example
 * <Route path="/users" element={ <AuthenticatedRoute> <Users /> </AuthenticatedRoute> }  />
 * @returns
 */
export const AuthenticatedRoute = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { isLoggedIn, logout } = useAuth();
  if (!isLoggedIn) {
    logout('sessionExpired');
  }
  return <>{children}</>;
};
