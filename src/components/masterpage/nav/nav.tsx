import { NavLink } from 'react-router-dom';
import styles from './nav.module.scss';
import { useState } from 'react';

export function Nav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div id={styles['nav-main']}>
      <nav className="d-none d-lg-flex">
        <NavLink to="/users" className={styles['nav-menu-link']}>
          User Management
        </NavLink>
        <NavLink to="/context-demo" className={styles['nav-menu-link']}>
          Context Demo
        </NavLink>
        <NavLink to="/redux-demo" className={styles['nav-menu-link']}>
          Redux Demo
        </NavLink>
      </nav>
      <div className={styles['nav-toggler']}>
        <div className="pt-2 float-end d-block d-lg-none">
          <a>Toggle!</a>
        </div>
      </div>
    </div>
  );
}
