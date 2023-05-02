import FormValidation from '$components/formValidation';
import FormValidationFormik from '$components/formValidationFormik';
import MUITable from '$components/mui-table';
import Parrot from '$components/parrot';
import Tiger from '$components/tiger';
import { AuthenticatedRoute } from '$shared';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Top level routes. Child routes should be in a route file on a route/root level
const HomeRoutes = lazy(() => import('./routes/home/home.routes'));
const UsersRoute = lazy(() => import('./routes/users/users.routes'));
const LoginPage = lazy(() => import('./routes/login/login.page'));
const NoContentPage = lazy(() => import('./routes/no-content/no-content.page'));
const DemosRoutes = lazy(() => import('./routes/demos/demos.routes'));

// Load element to use when a lazy loaded route is loading
const loader = <></>;

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={loader}>
            <HomeRoutes />
          </Suspense>
        }
      />

      <Route
        path="/users/*"
        element={
          <Suspense fallback={loader}>
            <AuthenticatedRoute>
              <UsersRoute />
            </AuthenticatedRoute>
          </Suspense>
        }
      />
      <Route
        path="/demos/*"
        element={
          <Suspense fallback={loader}>
            <DemosRoutes />
          </Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <Suspense fallback={loader}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/tiger" element={<Tiger />} />
      <Route path="/parrot" element={<Parrot />} />

      <Route path="/formValidation" element={<FormValidation />} />
      <Route path="/formValidationFormik" element={<FormValidationFormik />} />
      <Route path="/muiTable" element={<MUITable />} />
      <Route
        path="*"
        element={
          <Suspense fallback={loader}>
            <NoContentPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
