import { AuthProvider, ErrorBoundary, StarterProvider, UIGlobalProvider } from '$shared';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './app';
import './globals.scss';
import { ArticleAction, ArticleState, DispatchType } from './routes/demos/routes//redux-demo/type';
import reducer from './routes/demos/routes/redux-demo/store/reducer';
import './vendor.scss';

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root')!);
const rootRender = () => {
  return (
    <React.StrictMode>
      <PrimeReactProvider>
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
      </PrimeReactProvider>
    </React.StrictMode>
  );
};

root.render(rootRender());
