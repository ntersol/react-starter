import React, { useState } from 'react'
import PropTypes from 'prop-types'
import style from './autocomplete.module.css'
import cx from 'classnames'

const Match = (props) => {
  return (
    <li
      className={cx({ [style.highlight]: props.isActive })}
      onClick={props.onClick}
    >
      {props.children}
    </li>
  )
}
Match.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}
Match.defaultProps = {
}

const Autocomplete = (props) => {
  const [input, setInput] = useState('')
  // TODO The noMatchLI needs to disappear when a match has been accepted (clicked on)
  const noMatchLI = (<li className={style['no-match']} key={0}>No matches</li>)
  const [matches, setMatches] = useState([])
  const [selectedMatchIdx, setSelectedMatchIdx] = useState(0)

  const handleInput = (e) => {
    e.preventDefault()
    const value = e.target.value.trim()
    setInput(value)
    setMatches([])
    setSelectedMatchIdx(0)
    if (value.length) {
      setMatches(props.suggestions.reduce((accum, sugg) => {
        if (sugg.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          accum.push(sugg)
        }
        return accum
      }, []))
    }
  }
  return (
    <div className={style.wrapper}>
      <h1>Autocomplete</h1>
      <div className={style.instructions}>Start typing and see what happens...</div>
      <div className={style.control}>
        <input
          type='text'
          value={input}
          onChange={handleInput}
          className={style.input}
          onKeyUp={(e) => {
            if (/ArrowUp/.test(e.key) && selectedMatchIdx > 0) {
              setSelectedMatchIdx(selectedMatchIdx - 1)
            }
            if (/ArrowDown/.test(e.key) && selectedMatchIdx < matches.length - 1) {
              setSelectedMatchIdx(selectedMatchIdx + 1)
            }
            if (/Enter/.test(e.key)) {
              setInput(matches[selectedMatchIdx]); setMatches([])
            }
          }}
        />
        <ul className={style.matches}>
          {matches.length > 0 && matches.map((match, i) => (
            <Match
              key={i}
              isActive={selectedMatchIdx === i}
              onClick={() => {
                setInput(match)
                setMatches([])
              }}
            >{match}</Match>
          ))}
          {matches.length === 0 && noMatchLI}
        </ul>
      </div>
      <div className={style['list is-hoverable']} />
    </div>
  )
}
Autocomplete.propTypes = {
  suggestions: PropTypes.array
}

Autocomplete.defaultProps = {}
export default Autocomplete
