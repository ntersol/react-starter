import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'
import { setGlobalState } from '../../redux/actions'

export default function Redux2 ({ style }) {
  const globalState = useSelector(state => state.ourReducer)
  const { ourValue } = globalState
  const [ourLocalValue, setOurLocalValue] = useState(ourValue)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setOurLocalValue(e.target.value)
    dispatch(setGlobalState({ ourValue: e.target.value }))
  }

  return (
    <div className={cx(style.contextPanel, style.green)}>
      <h1 className={style.green}>Component Redux2</h1>
      <p>Component <span className={style.red}>Redux1</span> is my sibling. We have shared read/write access to
        Redux variable <span className={style.highlight}>ourValue</span>.</p>
      <p className={style.current}>ourValue is now <span className={style.highlight}>{ourValue}</span></p>
      Change <span className={style.highlight}>ourValue</span>: <input type='text' value={ourLocalValue} onChange={handleChange} />
    </div>
  )
}
Redux2.propTypes = {
  style: PropTypes.object
}
