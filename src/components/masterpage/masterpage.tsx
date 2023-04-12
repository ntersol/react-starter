import React, { ReactNode } from 'react';
import './masterpage.module.scss';
import { Header } from './header/header';
import { Footer } from './footer/footer';

type MasterpageProps = {
  children?: ReactNode | null;
};

export function Masterpage({ children }: MasterpageProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
