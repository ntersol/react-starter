import { NavLink } from 'react-router-dom';
import { Nav } from '../nav/nav';
import styles from './header.module.scss';

type HeaderProps = {
  /** Is the navigation visible */
  showNav?: boolean | null;
};

export function Header({ showNav }: HeaderProps = { showNav: true }) {
  return (
    <header>
      <NavLink to="/" className={styles['logo-link']}>
        <img className={styles['logo']} alt="React Starter" />
      </NavLink>

      <div className={styles['nav-content']}>{showNav !== false && <Nav />}</div>
    </header>
  );
}
