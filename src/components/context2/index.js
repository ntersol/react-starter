import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import StarterContext from '../../containers/App/StarterContext.js'
export default function Context2 ({ style }) {
  const { mockJSONfromService, mockServiceRenderer } = useContext(StarterContext)

  return (
    <div className={style.contextPanel}>
      <h1>Component 'Context2'</h1>
      <p>Component 'Context1' is my sibling.  I got this data from the Context API rather than a prop!</p>
      {mockServiceRenderer(mockJSONfromService)}
    </div>
  )
}
Context2.propTypes = {
  style: PropTypes.object
}
