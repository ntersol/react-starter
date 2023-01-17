import React from 'react'
import style from './reduxDemo.module.css'
import { Helmet } from 'react-helmet-async'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { BlogClient } from '../../components/blogClient'
import { Blog } from '../../components/blog'
import { IArticle } from '../../type'
import { addArticle } from '../../store/actionCreators'

export default function ReduxDemo () {
  const dispatch: Dispatch<any> = useDispatch()
  const saveArticle = React.useCallback(
    (article: IArticle) => dispatch(addArticle(article)),
    [dispatch]
  )
  return (
    <div>
      <div id={style.contextDemo}>
        <Helmet>
          <title>NTERSOL React Starter App - Redux Demo</title>
        </Helmet>
        <BlogClient saveArticle={saveArticle} />
        <BlogClient saveArticle={saveArticle} />?
      </div>
      <Blog />
    </div>
  )
}
