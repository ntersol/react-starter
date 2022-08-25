import React from 'react'
// @ts-ignore
import logo from './ntersolBanner.png'
import './App.scss'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>
          React Starter App
        </h1>
        <img src={logo} className='App-logo' alt='logo' />
        <br />
        <div className='scroll-left'><p>Table of Contents coming soon...</p></div>
      </header>
    </div>
  )
}

export default App
