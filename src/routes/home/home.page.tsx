import { Helmet } from 'react-helmet-async';
import './home.page.scss';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div id="home-page">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <div className="page-content">Home Page</div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/test1">Test 1</Link>
      </p>
      <p>
        <Link to="/test2">Test 2</Link>
      </p>
      <p>
        <Link to="/test3">Test 3</Link>
      </p>
    </div>
  );
}
