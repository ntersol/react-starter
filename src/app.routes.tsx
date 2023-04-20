import { Routes, Route, useRoutes, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import FormValidation from './components/formValidation';
import FormValidationFormik from './components/formValidationFormik';
import MUITable from './components/mui-table';
import Parrot from './components/parrot';
import Tiger from './components/tiger';
import { UsersRoutes, LoginPage, ContextDemo, ReduxDemo, NoContentPage } from './routes';
import { AuthenticatedRoute } from './shared';
import React, { Suspense, lazy } from 'react';

const HomeRoutes = lazy(() => import('./routes/home/home.routes'));
const AboutPage = lazy(() => import('./routes/about.page'));

/**
 *
 * @returns  <Route
        path="/test2/*"
        lazy={async () => {
          return await import('./routes/home/home.routes');

          const { HomeRoutes } = await import('./routes/home/home.routes');
          const temp = <HomeRoutes></HomeRoutes>;
          return { Component: HomeRoutes };

        }}
        />
        <Route
          path="/test3/*"
          lazy={() => {
            return import('./routes/home/home.routes');

            .then(r => r.HomeRoutes)

          }}
        />
         <Route path="/123" element={<HomeRoutes />} />
 */

// .then(r => ({ Component: r.HomeRoutes }))
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <HomeRoutes />
          </Suspense>
        }
      />

      <Route
        path="about"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AboutPage />
          </Suspense>
        }
      />

      <Route path="/users/*" element={<UsersRoutes />} />
      <Route
        path="/users2"
        element={
          <AuthenticatedRoute>
            <UsersRoutes />
          </AuthenticatedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tiger" element={<Tiger />} />
      <Route path="/parrot" element={<Parrot />} />
      <Route path="/context-demo" element={<ContextDemo />} />
      <Route path="/redux-demo" element={<ReduxDemo />} />
      <Route path="/formValidation" element={<FormValidation />} />
      <Route path="/formValidationFormik" element={<FormValidationFormik />} />
      <Route path="/muiTable" element={<MUITable />} />
      <Route path="*" element={<NoContentPage />} />
    </Routes>
  );
}
