import { Helmet } from 'react-helmet-async';

import { AppRoutes } from './app.routes';

function App() {
  return (
    <div id="app">
      <Helmet>
        <title>NTERSOL React Starter App - HomePage</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <main>
        <AppRoutes></AppRoutes>
      </main>
    </div>
  );
}

export default App;
