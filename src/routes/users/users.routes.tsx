import { Route, Routes } from 'react-router-dom';
import { ViewUsers } from './routes/modify-users/view-users.page';
import { userDetailsStore, usersStore } from './shared/stores/api.store';
import { usersUiStore } from './shared/stores/ui.store';
import { Users } from './users.page';

export default function UsersRoutes() {
  return (
    <usersUiStore.Provider>
      <usersStore.Provider>
        <userDetailsStore.Provider>
          <Routes>
            <Route path="view/:userId" element={<ViewUsers />} />
            <Route path="view" element={<ViewUsers />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </userDetailsStore.Provider>
      </usersStore.Provider>
    </usersUiStore.Provider>
  );
}
