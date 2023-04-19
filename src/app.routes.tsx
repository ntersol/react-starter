import { Routes, Route } from 'react-router-dom';
import FormValidation from './components/formValidation';
import FormValidationFormik from './components/formValidationFormik';
import MUITable from './components/mui-table';
import Parrot from './components/parrot';
import Tiger from './components/tiger';
import { HomeRoutes, UsersRoutes, LoginPage, ContextDemo, ReduxDemo, NoContentPage } from './routes';
import { AuthenticatedRoute } from './shared';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoutes />} />
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
