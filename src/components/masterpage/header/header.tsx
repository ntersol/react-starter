import React, { ReactNode } from 'react';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
import logo from 'shared/images/ntersolBanner.png';
import { Nav } from '../nav/nav';

type HeaderProps = {
  /** Is the navigation visible */
  showNav?: boolean | null;
};

export function Header({ showNav }: HeaderProps = { showNav: true }) {
  return (
    <header>
      <NavLink to="/" className={styles['logo-link']}>
        <img src={logo} className={styles['logo']} alt="Ntersol React Starter" />
      </NavLink>

      <div className={styles['nav-content']}>{showNav !== false && <Nav />}</div>
    </header>
  );
}
/**
 *

      <div>
        <img src={logo} className={styles.logo} alt="Ntersol React Starter" />
      </div>
      <div style={{ marginTop: '7px' }}>React Starter App</div>
      <nav>
        <div className={styles['centered-nav']}>
          <div>
            See the project <a href="https://github.com/ntersol/react-starter/blob/main/README.md">README</a> for full details
          </div>
          <h3>Choose a demo</h3>
          <ul>
            <li>
              Simple Routing Demo:
              <NavLink to="/" className="link">
                Home
              </NavLink>
              <NavLink to="/tiger" className="link">
                Tiger
              </NavLink>
              or
              <NavLink to="/parrot" className="link">
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

 */
