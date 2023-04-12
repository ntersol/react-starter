import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import tiger from '../../shared/images/tiger.svg';
import StarterContext from '../../StarterContext';
export default function () {
  const { HTMLtitlePre } = useContext(StarterContext);
  return (
    <div>
      <Helmet>
        <title>{HTMLtitlePre} - Tiger</title>
      </Helmet>
      <img src={tiger} style={{ margin: '0 auto', width: '500px', height: '500px' }} />
    </div>
  );
}
