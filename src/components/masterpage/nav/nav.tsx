import { BrowserRouter, NavLink } from 'react-router-dom';
import styles from './nav.module.scss';
import { ReactElement, useState } from 'react';
import classNames from 'classnames';
import { FaBars, FaCaretDown, FaComments, FaPowerOff, FaRegClone, FaUserCircle, FaUsers } from 'react-icons/fa';
import { Sidebar } from 'primereact/sidebar';
import { IconType } from 'react-icons';
import { useAuth } from '../../../shared';

interface NavBaseItem {
  label: string;
  icon?: ReactElement<any, any>;
  url?: string;
  action?: any;
}

interface NavLinkItem extends NavBaseItem {
  url: string;
}

interface NavItemClick extends NavBaseItem {
  onClick: () => any;
}

type NavItem = NavLinkItem | NavItemClick;

export function Nav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const auth = useAuth();

  /** Typeguard for navLink Item */
  const isNavLinkItem = (item: NavBaseItem): item is NavLinkItem => (item as NavLinkItem).url !== undefined;

  /** Generate a list of nav items. Support both nav links and callback functions */
  const navItemsGenerate = (navItems: NavItem[], fullLength?: boolean) =>
    navItems.map((nav, i) =>
      isNavLinkItem(nav) ? (
        <NavLink to={nav.url} className={classNames(styles['nav-menu-link'], fullLength && 'd-block')} key={i}>
          {nav.icon} <span className="ms-1">{nav.label}</span>
        </NavLink>
      ) : (
        <a onClick={() => nav.onClick()} className={classNames(styles['nav-menu-link'], fullLength && 'd-block')} key={i}>
          {nav.icon} <span className="ms-1">{nav.label}</span>
        </a>
      ),
    );

  /** Main nav items */
  const navItems: NavItem[] = [
    { label: 'User Management', icon: <FaUsers />, url: '/users' },
    { label: 'Context Demo', icon: <FaComments />, url: '/context-demo' },
    { label: 'Redux Demo', icon: <FaRegClone />, url: '/redux-demo' },
  ];
  const navItemsDom = navItemsGenerate(navItems);

  /** Util nav items */
  const navUtils: NavItem[] = [{ label: 'Sign Out', icon: <FaPowerOff />, onClick: () => auth.logout('userInitiated') }];
  const navUtilsDom = navItemsGenerate(navUtils, true);

  return (
    <div id={styles['nav-main']}>
      <nav className={classNames('d-none d-lg-flex')}>{navItemsDom}</nav>
      <div className={classNames(styles['nav-end'], 'd-flex d-md-block')}>
        <div className={classNames('d-none d-lg-block', styles['menu-container'])}>
          <span className={styles['menu-bar-toggle']}>
            <FaUserCircle /> <span className="me-2">User Name</span>
            <FaCaretDown />
          </span>
          <div className={styles['menu-bar']}>
            <div className={styles['menu-bar-container']}>{navUtilsDom}</div>
          </div>
        </div>
        <div>
          <div className="d-block d-lg-none">
            <button className={classNames(styles['nav-toggler'], 'link p-2')} onClick={() => setMobileNavOpen(!isMobileNavOpen)}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
      <Sidebar visible={isMobileNavOpen} onHide={() => setMobileNavOpen(false)}>
        <nav className={styles['nav-sidebar']}>
          {navItemsDom}
          <hr />
          {navUtilsDom}
        </nav>
      </Sidebar>
    </div>
  );
}
