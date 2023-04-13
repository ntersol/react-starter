import React, { useContext } from 'react';
import Context1 from './components/context1';
import Context2 from './components/context2';
import style from './context-demo.module.css';
import { Helmet } from 'react-helmet-async';
import { StarterContext } from '../../shared';
import { Masterpage } from '../../components';

/**
 * Route for context api demo
 * @returns
 */
export default function ContextDemo() {
  const { HTMLtitlePre } = useContext(StarterContext);
  return (
    <Masterpage>
      <div id={style.contextDemo}>
        <Helmet>
          <title>{HTMLtitlePre} - Demo of Context API</title>
        </Helmet>
        <Context1 style={style} />
        <Context2 style={style} />
      </div>
    </Masterpage>
  );
}
