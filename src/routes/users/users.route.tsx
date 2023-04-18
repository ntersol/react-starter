import { ReactNode } from 'react';
import { Models, useUiStore } from '../../shared';
import { Users } from './users';

export function UsersRoute() {
  const uiState = useUiStore<Models.User>({
    username: 'test@test.com',
  });
  return (
    <uiState.Provider>
      <Users></Users>
    </uiState.Provider>
  );
}
