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
          <Route path="modify-users/:userId" element={<ViewUsers />} />
          <Route path="modify-users" element={<ViewUsers />} />
          <Route path="" element={<Users />} />
        </Routes>
      </usersStore.Provider>
    </routeUiStore.Provider>
  );
}
