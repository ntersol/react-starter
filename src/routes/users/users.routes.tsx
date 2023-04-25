import { Routes, Route, Link } from 'react-router-dom';
import { Users } from './users.page';
import { ModifyUsers } from './routes/modify-users/modify-users.page';
import { routeUiStore } from './shared/stores/ui.store';
import { usersStore } from './shared/stores/api.store';

export default function UsersRoutes() {
  return (
    <routeUiStore.Provider>
      <usersStore.Provider>
        <Link className="mr-2" to="/users">
          Users List
        </Link>{' '}
        | <Link to="modify-users">Modify Users</Link>
        <hr />
        <Routes>
          <Route path="modify-users/:userId" element={<ModifyUsers />} />
          <Route path="modify-users" element={<ModifyUsers />} />
          <Route path="" element={<Users />} />
        </Routes>
      </usersStore.Provider>
    </routeUiStore.Provider>
  );
}
