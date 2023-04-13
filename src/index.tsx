import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './app';
// import store from './reduxOld/store'
import { ArticleState, ArticleAction, DispatchType } from './routes/redux-demo/type';
import { createStore, applyMiddleware, Store } from 'redux';
import reducer from './routes/redux-demo/store/reducer';

import './vendor.scss';
import './globals.scss';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
