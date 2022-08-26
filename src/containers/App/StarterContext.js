import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
const StarterContext = createContext()
const NUM_ITEMS = 6
export function StarterProvider ({ children }) {
  const HTMLtitlePre = 'NTERSOL React Starter App'
  const [JSONdata, setJSONdata] = useState([])
  const url = `https://randomuser.me/api?results=${NUM_ITEMS}`
  const fetchData = async (url) => {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setJSONdata(data.results)
      })
      .catch((e) => console.log(`fetch error.  No network connection?  randomuser.me is down? error = ${e}`))
  }
  useEffect(() => {
    fetchData(url)
  }, []) // Empty array for 2nd arg means this will be called once in component lifecycle

  const serviceRenderer = (data) => (<table border={1}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody>{
      data.map((user, i) => {
        const name = `${user.name.title} ${user.name.first} ${user.name.last}`
        const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`
        return (
          <tr key={`user_${i}`}>
            <td>{name.trim()}</td>
            <td>{user.email.trim()}</td>
            <td>{address.trim()}</td>
            <td>{user.phone.trim()}</td>
          </tr>
        )
      })
    }</tbody>
  </table>
  )

  return (
    <StarterContext.Provider
      value={{ HTMLtitlePre, JSONdata, serviceRenderer }}>
      {children}
    </StarterContext.Provider>
  )
}
StarterProvider.propTypes = {
  children: PropTypes.element
}
export default StarterContext
