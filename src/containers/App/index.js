import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { StarterProvider } from './StarterContext'
import Tiger from '../../components/tiger'
import Parrot from '../../components/parrot'
import ContextDemo from '../../components/contextDemo'
import ScrollMessage from '../../components/scrollMessage'
import logo from '../../image/ntersolBanner.png'
import style from './App.module.css'
import './links.css'

function Index () {
  return (
    <Router>
      <Helmet>
        <title>NTERSOL React Starter App - Home</title>
        <meta name='description' content='Starter Application for NTERSOL React projects' />
      </Helmet>
      <StarterProvider>
        <div className={style.App}>
          <header>
            <div><img src={logo} className={style.logo} alt='logo' /></div>
            <div style={{ marginTop: '7px' }}>React Starter App</div>
          </header>
          <nav>
            <div className={style['centered-nav']}>
              <ul>
                <li>Simple Routing Demo:
                  <NavLink to='/tiger' className={style.link} exact activeClassName='active'>Tiger</NavLink>
                  or
                  <NavLink to='/parrot' className={style.link} exact activeClassName='active'>Parrot</NavLink>
                </li>
                <li>
                  <NavLink to='/contextDemo' exact activeClassName='active'>Shared data via Context API</NavLink>
                </li>
              </ul>
              <ScrollMessage mesg='More Contents coming soon...' />
            </div>
          </nav>
          <main>
            <Routes>
              <Route exact='true' path='/tiger' element={<Tiger />} />
              <Route exact='true' path='/parrot' element={<Parrot />} />
              <Route exact='true' path='/contextDemo' element={<ContextDemo />} />
            </Routes>
          </main>
        </div>
      </StarterProvider>
    </Router>
  )
}

export default Index
