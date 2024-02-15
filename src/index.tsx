import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './app';
import { ArticleAction, ArticleState, DispatchType } from './routes/demos/routes//redux-demo/type';
import reducer from './routes/demos/routes/redux-demo/store/reducer';

import { AuthProvider, ErrorBoundary, StarterProvider, UIGlobalProvider } from '$shared';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import './globals.scss';
import './vendor.scss';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root')!);
const rootRender = () => {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <HelmetProvider>
          <BrowserRouter>
            <UIGlobalProvider>
              <StarterProvider>
                <AuthProvider>
                  <Provider store={store}>
                    <App />
                  </Provider>
                </AuthProvider>
              </StarterProvider>
            </UIGlobalProvider>
          </BrowserRouter>
        </HelmetProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

root.render(rootRender());
