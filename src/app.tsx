import { Helmet } from 'react-helmet-async';

import { Masterpage } from '$components';
import { AppRoutes } from './app.routes';

/**
 * Main app component
 * - If Masterpage is not on this component, page components flicker when it is rerendered
 * @returns
 */
function App() {
  return (
    <div id="app">
      <Helmet>
        <title>React Starter App - HomePage</title>
        <meta name="description" content="Starter Application for React projects" />
      </Helmet>
      <Masterpage>
        <main>
          <AppRoutes></AppRoutes>
        </main>
      </Masterpage>
    </div>
  );
}

export default App;
