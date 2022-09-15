import React, { useContext } from 'react'
import cx from 'classnames'
import StarterContext from '../../containers/App/StarterContext'
import { IContextProps } from '../../interfaces'
export default function Context1 (props:IContextProps) {
  const { JSONdata, serviceRenderer } = useContext(StarterContext)

  return (
    <div className={cx(props.style.contextPanel, props.style.red)}>
      <h1 className={props.style.red}>Component Context1</h1>
      <p>Component <span className={props.style.green}>Context2</span> is my sibling.  I got this data from the Context API rather than a prop!</p>
      {serviceRenderer(JSONdata)}
    </div>
  )
}
