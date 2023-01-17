import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './containers/App'
// import store from './reduxOld/store'
import { ArticleState, ArticleAction, DispatchType } from './reduxDemo/type'
import { createStore, applyMiddleware, Store } from 'redux'
import reducer from './reduxDemo/store/reducer'

import './index.scss'

const store: Store<ArticleState, ArticleAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
