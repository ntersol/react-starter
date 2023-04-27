import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';

import { StarterContext } from '$shared';
import parrot from '$shared/images/parrot.svg';

export default function () {
  const { HTMLtitlePre } = useContext(StarterContext);
  return (
    <div>
      <Helmet>
        <title>{HTMLtitlePre} - Parrot</title>
      </Helmet>

      <img src={parrot} style={{ margin: '0 auto', width: '500px', height: '500px' }} />
    </div>
  );
}
