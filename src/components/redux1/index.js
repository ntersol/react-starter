import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import cx from 'classnames'
import { setGlobalState } from '../../redux/actions'

export default function Redux1 ({ style }) {
  const ourStore = useSelector(state => state.ourReducer)
  const { ourValue } = ourStore.state
  const [localOurValue, setLocalOurValue] = useState(ourValue)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setLocalOurValue(e.target.value)
    dispatch(setGlobalState({ state: { ourValue: e.target.value } }))
  }

  return (
    <div className={cx(style.contextPanel, style.red)}>
      <h1 className={style.red}>Component Redux1</h1>
      <p>Component <span className={style.green}>Redux2</span> is my sibling. We have shared read/write access to
        Redux variable <span className={style.highlight}>ourValue</span>.</p>
      <p className={style.current}>ourValue is now <span className={style.highlight}>{ourValue}</span></p>
      Change <span className={style.highlight}>ourValue</span>: <input type='text' value={localOurValue} onChange={handleChange} />
    </div>
  )
}
Redux1.propTypes = {
  style: PropTypes.object
}
