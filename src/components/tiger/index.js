import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import StarterContext from '../../containers/App/StarterContext.js'
import tiger from '../../image/tiger.svg'
export default function () {
  const { HTMLtitlePre } = useContext(StarterContext)
  return (
    <div>
      <Helmet>
        <title>{HTMLtitlePre} - Tiger</title>
      </Helmet>
      <img src={tiger} style={{ margin: '0 auto', width: '500px', height: '500px' }} />
    </div>
  )
}
