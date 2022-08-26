import React from 'react'
import PropTypes from 'prop-types'
import style from './scrollMessage.module.css'
export default function ScrollMessage ({ mesg }) {
  return (
    <div className={style['scroll-left']}><p>{mesg}</p></div>
  )
}
ScrollMessage.propTypes = {
  mesg: PropTypes.string
}
