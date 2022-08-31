import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'
import { setClientState } from '../../redux/actions'

export default function Redux2 ({ style }) {
  const nameObj = useSelector(state => state.nameReducer)
  const { key } = nameObj.clientState
  const [foo, setFoo] = useState(key)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFoo(e.target.value)
    dispatch(setClientState({ key: e.target.value, type: 'splash' }))
  }

  return (
    <div className={cx(style.contextPanel, style.green)}>
      <h1 className={style.green}>Component Redux2</h1>
      <p>Component <span className={style.red}>Redux1</span> is my sibling. We have shared read/write access to
        Redux variable <span className={style.highlight}>ourValue</span>.</p>
      <p className={style.current}>ourValue is now <span className={style.highlight}>{key}</span></p>
      Change <span className={style.highlight}>ourValue</span>: <input type='text' value={foo} onChange={handleChange} />
    </div>
  )
}
Redux2.propTypes = {
  style: PropTypes.object
}
