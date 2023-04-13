import { NavLink } from 'react-router-dom';
import styles from './nav.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa';

export function Nav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div id={styles['nav-main']}>
      <nav className={classNames('d-none d-lg-flex')}>
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
      <div className={classNames(styles['nav-end'], 'd-flex d-md-block')}>
        <div className="d-none d-lg-block">Utility Nav!</div>
        <div>
          <div className="d-block d-lg-none">
            <button className={classNames(styles['nav-toggler'], 'link p-2')}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
