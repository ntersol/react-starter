import { Models, useUiStore } from '../../shared';
import { Users } from './users';

export const usersUiStore = useUiStore<Models.User>(
  {
    username: 'test@test.com',
  },
  {
    persistId: 'usersUiStore',
  },
);

export function UsersRoute() {
  return (
    <usersUiStore.Provider>
      <Users></Users>
    </usersUiStore.Provider>
  );
}
