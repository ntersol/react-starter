import { Routes, Route } from 'react-router-dom';
import { DemosPage } from './demos.page';
import ContextDemo from './routes/context-demo/context-demo';
import ReduxDemo from './routes/redux-demo/redux-demo';

export default function DemosRoutes() {
  return (
    <Routes>
      <Route path="/context-demo" element={<ContextDemo />} />
      <Route path="/redux-demo" element={<ReduxDemo />} />
      <Route path="" element={<DemosPage />} />
    </Routes>
  );
}
