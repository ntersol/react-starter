import parrot from '../../image/parrot.svg'
import { Helmet } from 'react-helmet'
import React from 'react'
export default function () {
  return (
    <div>
      <Helmet>
        <title>NTERSOL React Starter App - Parrot</title>
      </Helmet>

      <img src={parrot} style={{ margin: '0 auto', width: '500px', height: '500px' }} />
    </div>
  )
}
