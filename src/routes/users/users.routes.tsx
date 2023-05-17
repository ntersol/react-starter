import { Models, useUiStore } from '$shared';
import { Route, Routes } from 'react-router-dom';
import { ViewUsers } from './routes/modify-users/view-users.page';
import { userDetailsStore, usersStore } from './shared/stores/api.store';
import { Users } from './users.page';

export default function UsersRoutes() {
  // When declared outside a component, this is persistent
  const routeUiStore = useUiStore<Models.User>({ username: 'test@test.com' }, { localStorageId: 'usersUiStore' });
  return (
    <routeUiStore.Provider>
      <usersStore.Provider>
        <userDetailsStore.Provider>
          <Routes>
            <Route path="view/:userId" element={<ViewUsers />} />
            <Route path="view" element={<ViewUsers />} />
            <Route path="/" element={<Users />} />
          </Routes>
        </userDetailsStore.Provider>
      </usersStore.Provider>
    </routeUiStore.Provider>
  );
}
