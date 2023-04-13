import { NavLink } from 'react-router-dom';
import styles from './nav.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa';
import { Sidebar } from 'primereact/sidebar';

interface NavItem {
  label: string;
  icon?: string;
  url: string;
}

export function Nav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'User Management', icon: '', url: '/users' },
    { label: 'Context Demo', icon: '', url: '/context-demo' },
    { label: 'Redux Demo', icon: '', url: '/redux-demo' },
  ];

  const navDom = navItems.map((nav, i) => (
    <NavLink to={nav.url} className={styles['nav-menu-link']} key={i}>
      {nav.label}
    </NavLink>
  ));

  return (
    <div id={styles['nav-main']}>
      <nav className={classNames('d-none d-lg-flex')}>{navDom}</nav>
      <div className={classNames(styles['nav-end'], 'd-flex d-md-block')}>
        <div className="d-none d-lg-block">Utility Nav!</div>
        <div>
          <div className="d-block d-lg-none">
            <button className={classNames(styles['nav-toggler'], 'link p-2')} onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
      <Sidebar visible={isMobileNavOpen} onHide={() => setMobileNavOpen(false)}>
        <nav className={styles['nav-sidebar']}>{navDom}</nav>
      </Sidebar>
    </div>
  );
}
