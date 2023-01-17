import * as React from 'react'
import { IArticle } from '../../type.d'
import style from '../../containers/reduxDemo/reduxDemo.module.css'

type Props = {
    saveArticle: (article: IArticle | any) => void
}

export const BlogClient: React.FC<Props> = ({ saveArticle }) => {
  const [article, setArticle] = React.useState<IArticle | {}>()

  const handleArticleData = (e: React.FormEvent<HTMLInputElement>) => {
    setArticle({
      ...article,
      [e.currentTarget.id]: e.currentTarget.value
    })
  }

  const addNewArticle = (e: React.FormEvent) => {
    e.preventDefault()
    saveArticle(article)
  }

  return (
    <>
      <h1>Blog Client</h1>
      <form onSubmit={addNewArticle} className={style['Add-article']}>
        <input
          type='text'
          id='title'
          placeholder='Title'
          onChange={handleArticleData}
        />
        <input
          type='text'
          id='body'
          placeholder='Description'
          onChange={handleArticleData}
        />
        <button disabled={article === undefined}>
          Add article
        </button>
      </form>
    </>
  )
}
