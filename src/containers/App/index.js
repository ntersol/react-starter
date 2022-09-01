import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { StarterProvider } from './StarterContext'
import Tiger from '../../components/tiger'
import Parrot from '../../components/parrot'
import ContextDemo from '../contextDemo'
import ReduxDemo from '../reduxDemo'
import ScrollMessage from '../../components/scrollMessage'
import FormValidation from '../../components/formValidation'
import MUITable from '../../components/mui-table'
import logo from '../../image/ntersolBanner.png'
import style from './App.module.css'
import './links.css'

function App () {
  return (
    <Router>
      <HelmetProvider>
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
                <div>See the project <a href='https://github.com/ntersol/react-starter/blob/main/README.md'>README</a> for full details</div>
                <h3>Choose a demo</h3>
                <ul>
                  <li>Simple Routing Demo:
                    <NavLink
                      to='/tiger' className={style.link} exact='true'
                      activeclassname='active'>Tiger</NavLink>
                    or
                    <NavLink
                      to='/parrot' className={style.link} exact='true'
                      activeclassname='active'>Parrot</NavLink>
                  </li>
                  <li>
                    <NavLink to='/contextDemo' exact='true' activeclassname='active'>Shared data
                      via Context API</NavLink>
                  </li>
                  <li>
                    <NavLink to='/reduxDemo' exact='true' activeclassname='active'>Shared global
                      state via Redux</NavLink>
                  </li>
                  <li>
                    <NavLink to='/formValidation' exact='true' activeclassname='active'>Form
                      Validation</NavLink>
                  </li>
                  <li>
                    <NavLink to='/muiTable' exact='true' activeclassname='active'>Paginated,
                      Tabular Data</NavLink>
                  </li>
                </ul>
                <ScrollMessage mesg='More contents coming soon...' />
              </div>
            </nav>
            <main>
              <Routes>
                <Route exact='true' path='/' element={null} />
                <Route exact='true' path='/tiger' element={<Tiger />} />
                <Route exact='true' path='/parrot' element={<Parrot />} />
                <Route exact='true' path='/contextDemo' element={<ContextDemo />} />
                <Route exact='true' path='/reduxDemo' element={<ReduxDemo />} />
                <Route exact='true' path='/formValidation' element={<FormValidation />} />
                <Route exact='true' path='/muiTable' element={<MUITable />} />
              </Routes>
            </main>
          </div>
        </StarterProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
