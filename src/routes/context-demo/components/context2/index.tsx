import React, { useContext } from 'react';
import cx from 'classnames';
import { Models } from '$shared';
import { StarterContext } from '../../../../shared';
export default function Context2(props: Models.IStyleProps) {
  const { JSONdata, serviceRenderer } = useContext(StarterContext);
  const { style } = props;

  return (
    <div className={cx(style.contextPanel, style.green)}>
      <h1 className={style.green}>Component Context2</h1>
      <p>
        Component <span className={style.red}>Context1</span> is my sibling. I got this data from the Context API rather than a prop!
      </p>
      {serviceRenderer(JSONdata)}
    </div>
  );
}
