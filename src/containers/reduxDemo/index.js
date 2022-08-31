import React from 'react'
import { useSelector } from 'react-redux'
import Redux1 from '../../components/redux1'
import Redux2 from '../../components/redux2'
import style from './reduxDemo.module.css'
import { Helmet } from 'react-helmet-async'

export default function ContextDemo () {
  const nameObj = useSelector(state => state.nameReducer)
  const { key } = nameObj.clientState
  return (
    <div>
      <div id={style.contextDemo}>
        <Helmet>
          <title>NTERSOL React Starter App - Redux Demo</title>
        </Helmet>
        <Redux1 style={style} />
        <Redux2 style={style} />
      </div>
      <p className={style.current}>ourValue is now <span className={style.highlight}>{key}</span></p>
    </div>
  )
}
