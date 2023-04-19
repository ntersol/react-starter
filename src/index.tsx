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
import { AuthProvider, UiGlobalProvider } from './shared';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <UiGlobalProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UiGlobalProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
