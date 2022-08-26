import tiger from '../../image/tiger.svg'
import { Helmet } from 'react-helmet'
import React from 'react'
export default function () {
  return (
    <div>
      <Helmet>
        <title>NTERSOL React Starter App - Tiger</title>
      </Helmet>
      <img src={tiger} style={{ margin: '0 auto', width: '500px', height: '500px' }} />
    </div>
  )
}
