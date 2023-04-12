import * as React from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { IArticle } from '../type';
import style from '../redux-demo.module.css';

type Props = {
  article: IArticle;
  removeArticle: (article: IArticle) => void;
};

export const Article: React.FC<Props> = ({ article, removeArticle }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const deleteArticle = React.useCallback((article: IArticle) => dispatch(removeArticle(article)), [dispatch, removeArticle]);

  return (
    <span className={style['article-link']}>
      <a onClick={() => deleteArticle(article)}>{article.title}</a>
    </span>
  );
};
