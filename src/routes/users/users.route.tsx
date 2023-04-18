import { Routes, Route } from 'react-router-dom';
import { Models, useUiStore } from '../../shared';
import { Users } from './users';
import { ModifyUsers } from './routes/modify-users';
import { Masterpage } from '../../components';

export const usersUiStore = useUiStore<Models.User>({ username: 'test@test.com' }, { persistId: 'usersUiStore' });

export function UsersRoute() {
  return (
    <usersUiStore.Provider>
      <Masterpage>
        <Routes>
          <Route path="modify-users" element={<ModifyUsers />} />
          <Route path="/" element={<Users />} />
        </Routes>
      </Masterpage>
    </usersUiStore.Provider>
  );
}
