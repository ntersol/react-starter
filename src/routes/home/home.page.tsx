import { Helmet } from 'react-helmet-async';
import './home.page.scss';

export function HomePage() {
  return (
    <div id="home-page">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <div className="page-content">Home Page</div>
    </div>
  );
}
