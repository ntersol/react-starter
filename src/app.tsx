import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { StarterProvider } from './StarterContext';
import Tiger from './components/tiger';
import Parrot from './components/parrot';
import ScrollMessage from './components/scrollMessage';
import FormValidation from './components/formValidation';
import MUITable from './components/mui-table';
import FormValidationFormik from './components/formValidationFormik';
import logo from './shared/images/ntersolBanner.png';
import style from './app.module.css';
import './links.css';
import { ContextDemo, ReduxDemo } from './routes';

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
            <header>
              <div>
                <img src={logo} className={style.logo} alt="logo" />
              </div>
              <div style={{ marginTop: '7px' }}>React Starter App</div>
            </header>
            <nav>
              <div className={style['centered-nav']}>
                <div>
                  See the project <a href="https://github.com/ntersol/react-starter/blob/main/README.md">README</a> for full details
                </div>
                <h3>Choose a demo</h3>
                <ul>
                  <li>
                    Simple Routing Demo:
                    <NavLink to="/tiger" className={style.link}>
                      Tiger
                    </NavLink>
                    or
                    <NavLink to="/parrot" className={style.link}>
                      Parrot
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contextDemo">Shared data via Context API</NavLink>
                  </li>
                  <li>
                    <NavLink to="/redux-demo">Shared global state via Redux</NavLink>
                  </li>
                  <li>
                    <NavLink to="/formValidation">Form Validation with react-hook-form</NavLink>
                  </li>
                  <li>
                    <NavLink to="/formValidationFormik">Form Validation with formik</NavLink>
                  </li>
                  <li>
                    <NavLink to="/muiTable">Paginated, Tabular Data</NavLink>
                  </li>
                </ul>
                <ScrollMessage mesg="Conversion to TypesScript coming soon..." />
              </div>
            </nav>
            <main>
              <Routes>
                <Route path="/" element={null} />
                <Route path="/tiger" element={<Tiger />} />
                <Route path="/parrot" element={<Parrot />} />
                <Route path="/contextDemo" element={<ContextDemo />} />
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
