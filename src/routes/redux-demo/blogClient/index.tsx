import * as React from 'react';
import { IArticle } from '../type';
import style from '../redux-demo.module.css';
import { Blog } from '../blog';

type Props = {
  saveArticle: (article: IArticle | any) => void;
  position: number;
};

export const BlogClient: React.FC<Props> = ({ saveArticle, position }) => {
  const [article, setArticle] = React.useState<IArticle | {}>();
  const [articleValue, setArticleValue] = React.useState('');

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    setArticleValue(e.currentTarget.value);
  };

  const addNewArticle = (e: React.FormEvent) => {
    e.preventDefault();
    saveArticle(article);
    setArticleValue('');
  };

  return (
    <div className={style.client}>
      <h1>Shopping List Client {position}</h1>
      <form onSubmit={addNewArticle} className={style['Add-article']}>
        <input type="text" id="title" value={articleValue} placeholder="Shopping item" onChange={handleArticleData} />
        <button disabled={article === undefined}>Add item</button>
      </form>
      <Blog />
    </div>
  );
};
