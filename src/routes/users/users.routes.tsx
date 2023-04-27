import { Route, Routes } from 'react-router-dom';
import { ViewUsers } from './routes/modify-users/view-users.page';
import { usersStore } from './shared/stores/api.store';
import { routeUiStore } from './shared/stores/ui.store';
import { Users } from './users.page';

export default function UsersRoutes() {
  return (
    <routeUiStore.Provider>
      <usersStore.Provider>
        <Routes>
          <Route path="view/:userId" element={<ViewUsers />} />
          <Route path="view" element={<ViewUsers />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </usersStore.Provider>
    </routeUiStore.Provider>
  );
}
