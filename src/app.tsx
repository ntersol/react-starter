import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { StarterProvider } from './shared/context/starter-context';
import Tiger from './components/tiger';
import Parrot from './components/parrot';
import FormValidation from './components/formValidation';
import MUITable from './components/mui-table';
import FormValidationFormik from './components/formValidationFormik';

import style from './app.module.css';
import { ContextDemo, Home, Login, ReduxDemo, Users } from './routes';
import { PrivateRoute } from './shared';

function App() {
  return (
    <Router>
      <HelmetProvider>
        <Helmet>
          <title>NTERSOL React Starter App - Home</title>
          <meta name="description" content="Starter Application for NTERSOL React projects" />
        </Helmet>
        <StarterProvider>
          <div className={style.App}>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/users2"
                  element={
                    <PrivateRoute>
                      <Users />
                    </PrivateRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/tiger" element={<Tiger />} />
                <Route path="/parrot" element={<Parrot />} />
                <Route path="/context-demo" element={<ContextDemo />} />
                <Route path="/redux-demo" element={<ReduxDemo />} />
                <Route path="/formValidation" element={<FormValidation />} />
                <Route path="/formValidationFormik" element={<FormValidationFormik />} />
                <Route path="/muiTable" element={<MUITable />} />
              </Routes>
            </main>
          </div>
        </StarterProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
