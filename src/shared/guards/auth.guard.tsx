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
  const { isLoggedIn } = useAuth();
  const loc = useLocation();
  return isLoggedIn ? <>{children}</> : <Navigate replace={true} to="/login" state={{ from: `${loc.pathname}${loc.search}` }} />;
};
