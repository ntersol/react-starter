import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { IArticle } from '../../type.d'
import style from '../../containers/reduxDemo/reduxDemo.module.css'

type Props = {
    article: IArticle
    removeArticle: (article: IArticle) => void
}

export const Article: React.FC<Props> = ({ article, removeArticle }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteArticle = React.useCallback(
    (article: IArticle) => dispatch(removeArticle(article)),
    [dispatch, removeArticle]
  )

  return (
    <div className={style.Article}>
      <div>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
      <button onClick={() => deleteArticle(article)}>Delete</button>
    </div>
  )
}
