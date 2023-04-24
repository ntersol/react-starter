import React from 'react';
import style from './redux-demo.module.css';
import { Helmet } from 'react-helmet-async';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { BlogClient } from './blogClient';
import { IArticle } from './type';
import { addArticle } from './store/actionCreators';
import { Masterpage } from 'components';

export default function ReduxDemo() {
  const dispatch: Dispatch<any> = useDispatch();
  const saveArticle = React.useCallback((article: IArticle) => dispatch(addArticle(article)), [dispatch]);
  return (
    <Masterpage>
      <div>
        <div id={style.contextDemo}>
          <Helmet>
            <title>NTERSOL React Starter App - Redux Demo</title>
          </Helmet>
          <div className={style.clients}>
            <BlogClient saveArticle={saveArticle} position={1} />
            <BlogClient saveArticle={saveArticle} position={2} />
          </div>
        </div>
      </div>
    </Masterpage>
  );
}
