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
    <div>
      <div className={style.main}>
        <div className={style.label}>Your List: </div>
        <div>
          {articles.length > 0
            ? articles.map((article: IArticle) => (
              <Article
                key={article.id}
                article={article}
                removeArticle={removeArticle}
              />
            ))
            : (<span> Empty</span>)}
        </div>
      </div>
      {articles.length > 0 ? (<div className={style.instructions}>Click on item to delete</div>) : null}
    </div>
  )
}
