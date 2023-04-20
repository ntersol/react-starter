import { Routes, Route } from 'react-router-dom';
import { HomePage } from './home.page';

export function HomeRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
    </Routes>
  );
}

export default HomeRoutes;
