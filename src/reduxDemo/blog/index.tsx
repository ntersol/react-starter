import React from 'react'
import { Article } from '../article'
import { IArticle, ArticleState } from '../type'
import { useSelector, shallowEqual } from 'react-redux'
import { removeArticle } from '../store/actionCreators'
import style from '../reduxDemo.module.css'

export const Blog: React.FC = () => {
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  )

  return (
    <div className={style.main}>
      <h1>Blog</h1>
      {articles.map((article: IArticle) => (
        <Article
          key={article.id}
          article={article}
          removeArticle={removeArticle}
        />
      ))}
    </div>
  )
}
