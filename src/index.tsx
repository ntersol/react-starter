import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './app';
import { ArticleState, ArticleAction, DispatchType } from './routes/redux-demo/type';
import { createStore, applyMiddleware, Store } from 'redux';
import reducer from './routes/redux-demo/store/reducer';

import './vendor.scss';
import './globals.scss';
import { AuthProvider, GlobalUiStore, StarterProvider } from './shared';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <StarterProvider>
          <AuthProvider>
            <GlobalUiStore.Provider>
              <Provider store={store}>
                <App />
              </Provider>
            </GlobalUiStore.Provider>
          </AuthProvider>
        </StarterProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
