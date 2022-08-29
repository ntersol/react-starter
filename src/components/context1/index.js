import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import StarterContext from '../../containers/App/StarterContext.js'
import cx from 'classnames'
export default function Context1 ({ style }) {
  const { JSONdata, serviceRenderer } = useContext(StarterContext)

  return (
    <div className={cx(style.contextPanel, style.red)}>
      <h1 className={style.red}>Component Context1</h1>
      <p>Component <span className={style.green}>Context2</span> is my sibling.  I got this data from the Context API rather than a prop!</p>
      {serviceRenderer(JSONdata)}
    </div>
  )
}
Context1.propTypes = {
  style: PropTypes.object
}
