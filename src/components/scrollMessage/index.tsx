import React from 'react'
import style from './scrollMessage.module.css'

type Props = {
  mesg: string
}
const ScrollMessage: React.FC<Props> = ({ mesg }) => {
  return (
    <div className={style['scroll-left']}><p>{mesg}</p></div>
  )
}
export default ScrollMessage
