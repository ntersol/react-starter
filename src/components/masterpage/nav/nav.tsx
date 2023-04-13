import { NavLink } from 'react-router-dom';
import styles from './nav.module.scss';

export function Nav() {
  return (
    <nav id="nav-main">
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
  );
}
