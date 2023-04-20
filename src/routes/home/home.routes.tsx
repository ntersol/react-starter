import { Routes, Route } from 'react-router-dom';
import { Masterpage } from '../../components';
import HomePage from './home.page';

export function HomeRoutes() {
  return (
    <Masterpage>
      Test
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="" element={<HomePage />} />
      </Routes>
    </Masterpage>
  );
}

export default HomeRoutes;
