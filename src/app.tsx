import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { StarterProvider } from './shared/context/starter-context';
import Tiger from './components/tiger';
import Parrot from './components/parrot';
import FormValidation from './components/formValidation';
import MUITable from './components/mui-table';
import FormValidationFormik from './components/formValidationFormik';

import style from './app.module.css';
import { ContextDemo, HomeRoutes, LoginPage, NoContentPage, ReduxDemo, UsersRoutes } from './routes';
import { AuthenticatedRoute } from './shared';
import { globalUiStore } from './shared/stores';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <Helmet>
          <title>NTERSOL React Starter App - HomePage</title>
          <meta name="description" content="Starter Application for NTERSOL React projects" />
        </Helmet>
        <globalUiStore.Provider>
          <StarterProvider>
            <div className={style.App}>
              <main>
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
              </main>
            </div>
          </StarterProvider>
        </globalUiStore.Provider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
