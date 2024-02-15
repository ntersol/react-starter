import * as actionTypes from './actionTypes'
import { ArticleState, ArticleAction, IArticle } from '../type'

const initialState: ArticleState = {
  articles: [
    {
      id: 1,
      title: 'eggs'
    },
    {
      id: 2,
      title: 'apples'
    }
  ]
}
const reducer = (
  state: ArticleState = initialState,
  action: ArticleAction
): ArticleState => {
  switch (action.type) {
  case actionTypes.ADD_ARTICLE:
    // eslint-disable-next-line no-case-declarations
    const newArticle: IArticle = {
      id: Math.random(), // not really unique
      title: action.article.title
    }
    return {
      ...state,
      articles: state.articles.concat(newArticle)
    }
  case actionTypes.REMOVE_ARTICLE:
    // eslint-disable-next-line no-case-declarations
    const updatedArticles: IArticle[] = state.articles.filter(
      article => article.id !== action.article.id
    )
    return {
      ...state,
      articles: updatedArticles
    }
  }
  return state
}

export default reducer
