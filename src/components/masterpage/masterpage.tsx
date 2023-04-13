import React, { ReactNode } from 'react';
import './masterpage.module.scss';
import { Header } from './header/header';
import { Footer } from './footer/footer';

type MasterpageProps = {
  children?: ReactNode | null;
  /** Is the navigation visible */
  showNav?: boolean | null;
};

export function Masterpage({ children, showNav }: MasterpageProps) {
  return (
    <div className="container-fluid">
      <Header showNav={showNav} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
