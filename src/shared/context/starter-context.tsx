import React, { FC, createContext, useEffect, useState } from 'react';
import { Models } from '../models/global.models';
const initialStarter: Models.IStarterContext = {
  HTMLtitlePre: '',
  JSONdata: [],
  serviceRenderer: () => {
    return <></>;
  },
};
/**
 * Context for starter
 */
export const StarterContext = createContext<Models.IStarterContext>(initialStarter);
const NUM_ITEMS = 6;
/**
 * Starter context provider
 * @param param0
 * @returns
 */
export const StarterProvider: FC<Models.IChildrenProps> = function ({ children }) {
  const HTMLtitlePre = 'React Starter App';
  const [JSONdata, setJSONdata] = useState([]);
  const url: string = `https://randomuser.me/api?results=${NUM_ITEMS}`;
  const fetchData = async (url: string) => {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setJSONdata(data.results);
      })
      .catch(e => console.log(`fetch error.  No network connection?  randomuser.me is down? error = ${e}`));
  };
  useEffect(() => {
    fetchData(url);
  }, [url]); // Empty array for 2nd arg means this will be called once in component lifecycle

  const serviceRenderer = (data: Array<Models.IResult>): React.ReactNode => (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user: Models.IResult, i) => {
          const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
          const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`;
          return (
            <tr key={`user_${i}`}>
              <td>{name.trim()}</td>
              <td>{user.email.trim()}</td>
              <td>{address.trim()}</td>
              <td>{user.phone.trim()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
  const initialContext: Models.IStarterContext = { HTMLtitlePre, JSONdata, serviceRenderer };

  return <StarterContext.Provider value={initialContext}>{children}</StarterContext.Provider>;
};

// export default StarterContext;
// export { StarterProvider };
