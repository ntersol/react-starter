import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import StarterContext from '../../containers/App/StarterContext.js'
export default function Context1 ({ style }) {
  const { JSONdata, serviceRenderer } = useContext(StarterContext)

  return (
    <div className={style.contextPanel}>
      <h1>Component 'Context1'</h1>
      <p>Component 'Context2' is my sibling.  I got this data from the Context API rather than a prop!</p>
      {serviceRenderer(JSONdata)}
    </div>
  )
}
Context1.propTypes = {
  style: PropTypes.object
}
