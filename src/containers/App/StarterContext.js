import React, { createContext } from 'react'
import PropTypes from 'prop-types'
const StarterContext = createContext()
export function StarterProvider ({ children }) {
  const HTMLtitlePre = 'NTERSOL React Starter App'
  const mockJSONfromService = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    }
  ]
  const mockServiceRenderer = (data) => (<table border={1}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
      </tr>
    </thead>
    <tbody> {
      data.map((user, i) => <tr key={`user_${i}`}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.address.street} {user.address.suite}, {user.address.city}, {user.zipcode}</td>
        <td>{user.phone}</td>
      </tr>)
    }
    </tbody>
  </table>
  )

  return (
    <StarterContext.Provider
      value={{ HTMLtitlePre, mockJSONfromService, mockServiceRenderer }}>
      {children}
    </StarterContext.Provider>
  )
}
StarterProvider.propTypes = {
  children: PropTypes.element
}
export default StarterContext
