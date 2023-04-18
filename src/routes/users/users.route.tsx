import { Routes, Route, Link } from 'react-router-dom';
import { Users } from './users.page';
import { ModifyUsers } from './routes/modify-users.page';
import { Masterpage } from '../../components';
import { routeUiStore } from './shared/stores/ui.store';

export function UsersRoute() {
  return (
    <routeUiStore.Provider>
      <Masterpage>
        <Link className="mr-2" to="/users">
          Users List
        </Link>{' '}
        | <Link to="modify-users">Modify Users</Link>
        <hr />
        <Routes>
          <Route path="modify-users" element={<ModifyUsers />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </Masterpage>
    </routeUiStore.Provider>
  );
}
