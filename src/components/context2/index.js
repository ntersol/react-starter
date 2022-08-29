import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import StarterContext from '../../containers/App/StarterContext.js'
import cx from 'classnames'
export default function Context2 ({ style }) {
  const { JSONdata, serviceRenderer } = useContext(StarterContext)

  return (
    <div className={cx(style.contextPanel, style.green)}>
      <h1 className={style.green}>Component Context2</h1>
      <p>Component <span className={style.red}>Context1</span> is my sibling.  I got this data from the Context API rather than a prop!</p>
      {serviceRenderer(JSONdata)}
    </div>
  )
}
Context2.propTypes = {
  style: PropTypes.object
}
