import { Masterpage } from '$components';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { BlogClient } from './blogClient';
import style from './redux-demo.module.css';
import { addArticle } from './store/actionCreators';
import { IArticle } from './type';

export default function ReduxDemo() {
  const dispatch: Dispatch<any> = useDispatch();
  const saveArticle = React.useCallback((article: IArticle) => dispatch(addArticle(article)), [dispatch]);
  return (
    <Masterpage>
      <div>
        <div id={style.contextDemo}>
          <Helmet>
            <title>React Starter App - Redux Demo</title>
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
